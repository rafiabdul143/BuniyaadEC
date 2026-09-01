import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { randomInt } from 'crypto';
import * as argon2 from 'argon2';
import { StringValue } from 'ms';
import { RefreshTokenDto } from './dto/refresh-token.dto'; // or './dto'
import * as crypto from 'crypto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UsersService } from '../users/users.service';
import { EmailService } from '../email/email.service';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';
import {
  UserWithRolesInput,
  UserRoleRelation,
  JwtPayload,
  RoleName,
  RoleEnum,
} from './interfaces/authenticated-user.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly prisma: PrismaService,
  ) {}

  private generateOtp(): string {
    return randomInt(100000, 1000000).toString();
  }

  private async createAndSendOtp(userId: string, email: string, fullName: string): Promise<void> {
    const rawOtp = this.generateOtp();
    const otpHash = await argon2.hash(rawOtp);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await this.prisma.emailVerification.create({
      data: {
        userId,
        otpHash,
        expiresAt,
      },
    });

    await this.emailService.sendVerificationOtp(email, fullName, rawOtp);
  }

public extractUserRoles(user: UserWithRolesInput): RoleName[] {
  if (!user.userRoles || !Array.isArray(user.userRoles) || user.userRoles.length === 0) {
    throw new ForbiddenException('User has no assigned roles in the system.');
  }

  const roles: RoleName[] = user.userRoles.map((ur) => ur.role.name as RoleName);
  const validRoles: string[] = Object.values(RoleEnum);

  const hasInvalidRole = roles.some((role: RoleName) => !validRoles.includes(role));
  if (hasInvalidRole) {
    throw new ForbiddenException('User contains invalid or unmapped system roles.');
  }

  return roles;
}

  async generateAccessToken(user: UserWithRolesInput): Promise<string> {
    const assignedRoles = this.extractUserRoles(user);

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      roles: assignedRoles,
    };

    return this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN', '15m') as StringValue,
    });
  }

  async generateRefreshToken(user: UserWithRolesInput): Promise<string> {
    const assignedRoles = this.extractUserRoles(user);

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      roles: assignedRoles,
    };

    return this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d') as StringValue,
    });
  }

  private async generateTokens(user: UserWithRolesInput) {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(user),
      this.generateRefreshToken(user),
    ]);

    return { accessToken, refreshToken };
  }

  async register(dto: RegisterDto) {
    const normalizedEmail = dto.email.trim().toLowerCase();

    const existingUser = await this.usersService.findByEmailWithPassword(normalizedEmail);
    if (existingUser) {
      throw new ConflictException('An account with this email address already exists.');
    }

    const passwordHash = await argon2.hash(dto.password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1,
    });

    const createdUser = await this.usersService.create({
      fullName: dto.fullName,
      email: normalizedEmail,
      passwordHash,
    });

    await this.createAndSendOtp(createdUser.id, createdUser.email, createdUser.fullName);

    this.logger.log(`User registered: ${createdUser.email} [${createdUser.id}] - Verification OTP sent.`);

    return {
      message: 'Account registered successfully. Please check your email for the verification OTP.',
      user: createdUser,
    };
  }

  async verifyEmail(dto: VerifyEmailDto) {
    const normalizedEmail = dto.email.trim().toLowerCase();

    const user = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      throw new BadRequestException('Invalid email address.');
    }

    if (user.emailVerified) {
      return { message: 'Email address is already verified.' };
    }

    const verification = await this.prisma.emailVerification.findFirst({
      where: {
        userId: user.id,
        verifiedAt: null,
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!verification) {
      throw new BadRequestException('No pending email verification request found.');
    }

    if (verification.attempts >= 5) {
      throw new BadRequestException('Maximum verification attempts exceeded. Please request a new OTP.');
    }

    await this.prisma.emailVerification.update({
      where: { id: verification.id },
      data: { attempts: { increment: 1 } },
    });

    if (new Date() > verification.expiresAt) {
      throw new BadRequestException('Verification OTP has expired. Please request a new OTP.');
    }

    const isOtpValid = await argon2.verify(verification.otpHash, dto.otp);
    if (!isOtpValid) {
      throw new BadRequestException('Invalid verification code.');
    }

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: true },
      }),
      this.prisma.emailVerification.update({
        where: { id: verification.id },
        data: { verifiedAt: new Date() },
      }),
    ]);

    this.logger.log(`Email successfully verified for user ${user.email} [${user.id}]`);

    return { message: 'Email address verified successfully. You may now log in.' };
  }

  async resendVerificationOtp(dto: ResendVerificationDto) {
    const normalizedEmail = dto.email.trim().toLowerCase();

    const user = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      throw new BadRequestException('Invalid email address.');
    }

    if (user.emailVerified) {
      return { message: 'Email address is already verified.' };
    }

    const recentOtp = await this.prisma.emailVerification.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    if (recentOtp) {
      const secondsSinceLastRequest = (Date.now() - recentOtp.createdAt.getTime()) / 1000;
      if (secondsSinceLastRequest < 60) {
        throw new BadRequestException(
          `Please wait ${Math.ceil(60 - secondsSinceLastRequest)} seconds before requesting a new OTP.`,
        );
      }
    }

    await this.createAndSendOtp(user.id, user.email, user.fullName);

    return { message: 'A new verification code has been dispatched to your email.' };
  }

  async login(dto: LoginDto) {
    const normalizedEmail = dto.email.trim().toLowerCase();

    const user = await this.usersService.findByEmailWithPassword(normalizedEmail);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated. Please contact support.');
    }

    if (!user.emailVerified) {
      throw new UnauthorizedException(
        'Email address is not verified. Please verify your email before logging in.',
      );
    }

    const isPasswordValid = await argon2.verify(user.passwordHash, dto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const roles = this.extractUserRoles(user);
    void this.usersService.updateLastLogin(user.id);

    const tokens = await this.generateTokens(user);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

    this.logger.log(`User logged in successfully: ${user.email} [${user.id}]`);

    return {
      message: 'Login successful.',
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        isActive: user.isActive,
        emailVerified: user.emailVerified,
        roles,
      },
    };
  }
async refreshTokens(refreshTokenDto: RefreshTokenDto) {
  const { refreshToken } = refreshTokenDto;

  // 1. Verify and decode the refresh token
  let payload: { sub: string };
  try {
    payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
    });
  } catch (error) {
    throw new ForbiddenException('Access denied. Invalid or expired refresh token.');
  }

  const userId = payload?.sub;
  if (!userId) {
    throw new ForbiddenException('Access denied. Invalid token payload.');
  }

  // 2. Query user by ID (now guaranteed to be defined)
  const user = await this.usersService.findByIdWithRefreshToken(userId);
  if (!user || !user.refreshTokenHash || !user.isActive) {
    throw new ForbiddenException('Access denied.');
  }

  // 3. Verify hashed token stored in DB against supplied refresh token
  const refreshTokenMatches = await argon2.verify(user.refreshTokenHash, refreshToken);
  // Note: If using bcrypt in your project, use: await bcrypt.compare(refreshToken, user.refreshTokenHash);
  
  if (!refreshTokenMatches) {
    throw new ForbiddenException('Access denied. Invalid refresh token.');
  }

  // 4. Generate rotated token pair and update token hash in DB
  const tokens = await this.generateTokens(user);
  await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

  return tokens;
}

  async logout(userId: string) {
    await this.usersService.updateRefreshTokenHash(userId, null);
    return { message: 'Logged out successfully.' };
  }

  private async updateRefreshTokenHash(userId: string, refreshToken: string | null) {
    const hash = refreshToken ? await argon2.hash(refreshToken) : null;
    await this.usersService.updateRefreshTokenHash(userId, hash);
  }
  // Inside AuthService class:

async forgotPassword(dto: ForgotPasswordDto) {
  const { email } = dto;
  const user = await this.prisma.user.findUnique({ where: { email } });

  // Prevent email enumeration attacks: return generic success response
  if (!user) {
    return { message: 'If your email is registered, you will receive a password reset link.' };
  }

  // Generate a secure random raw token
  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = await argon2.hash(rawToken);
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiry

  // Invalidate any previous un-used tokens for this user
  await this.prisma.passwordResetToken.updateMany({
    where: { userId: user.id, usedAt: null },
    data: { usedAt: new Date() },
  });

  // Store hashed token in database
  const resetTokenRecord = await this.prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt,
    },
  });

  // Token includes ID for O(1) lookup
  const finalToken = `${resetTokenRecord.id}:${rawToken}`;

  // Send raw token via email service (captured by test mock)
  await this.emailService.sendPasswordResetEmail(user.email, finalToken);

  return { message: 'If your email is registered, you will receive a password reset link.' };
}

async resetPassword(dto: ResetPasswordDto) {
  const { token, newPassword } = dto;

  const parts = token.split(':');
  if (parts.length !== 2) {
    throw new BadRequestException('Invalid or expired password reset token.');
  }

  const [tokenId, rawToken] = parts;

  let validRecord = null;
  try {
    validRecord = await this.prisma.passwordResetToken.findUnique({
      where: { id: tokenId },
    });
  } catch (error) {
    throw new BadRequestException('Invalid or expired password reset token.');
  }

  if (!validRecord || validRecord.usedAt || validRecord.expiresAt <= new Date()) {
    throw new BadRequestException('Invalid or expired password reset token.');
  }

  const isMatch = await argon2.verify(validRecord.tokenHash, rawToken).catch(() => false);
  if (!isMatch) {
    throw new BadRequestException('Invalid or expired password reset token.');
  }

  const hashedPassword = await argon2.hash(newPassword);

  // Atomically update user password, mark token as used, and clear refresh token hash to logout existing sessions
  await this.prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: validRecord.userId },
      data: {
        passwordHash: hashedPassword,
        refreshTokenHash: null, // Invalidate existing sessions for security
      },
    });

    await tx.passwordResetToken.update({
      where: { id: validRecord.id },
      data: { usedAt: new Date() },
    });
  });

  return { message: 'Password has been successfully reset.' };
}
}