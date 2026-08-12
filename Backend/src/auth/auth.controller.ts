// src/auth/auth.controller.ts
import { AuthenticatedUser } from './interfaces/authenticated-user.interface'; 
import { Controller, Post, Get, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { GetUser } from './decorators/get-user.decorator';
  import{UnauthorizedException} from '@nestjs/common';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  async verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.authService.verifyEmail(dto);
  }

  @Post('resend-verification')
  @HttpCode(HttpStatus.OK)
  async resendVerification(@Body() dto: ResendVerificationDto) {
    return this.authService.resendVerificationOtp(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

 // If using a Public decorator
@Post('refresh')
@HttpCode(HttpStatus.OK)
async refreshTokens(@Body() dto: RefreshTokenDto) {
  return this.authService.refreshTokens(dto);
}


// src/auth/auth.controller.ts
// src/auth/auth.controller.ts

  @UseGuards(JwtAuthGuard) // <--- ADD THIS GUARD HERE
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetUser('userId') userId: string) {
    if (!userId) {
      throw new UnauthorizedException('User ID not found in token payload.');
    }

    return this.authService.logout(userId);
  }
  @UseGuards(JwtAuthGuard)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getProfile(@GetUser() user: any) {
    return {
      message: 'Authenticated profile fetched successfully.',
      user,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('admin-only')
  @HttpCode(HttpStatus.OK)
  async getAdminData() {
    return {
      message: 'Welcome Admin! You have access to sensitive system management metrics.',
    };
  }
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN')
@Get('super-admin-only')
getSuperAdminData() {
  return {
    message: 'Welcome Super Admin! You have root-level system management privileges.',
  };
}
}