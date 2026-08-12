import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, AuthenticatedUser, RoleEnum } from '../interfaces/authenticated-user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<AuthenticatedUser> {
    if (!payload.roles || !Array.isArray(payload.roles) || payload.roles.length === 0) {
      throw new UnauthorizedException('Invalid token payload: roles missing.');
    }

    const validRoles = Object.values(RoleEnum);
    const hasInvalidRole = payload.roles.some((role: string) => !validRoles.includes(role as any));

    if (hasInvalidRole) {
      throw new UnauthorizedException('Invalid token payload: unrecognized roles.');
    }

    return {
      userId: payload.sub,
      email: payload.email,
      roles: payload.roles,
    };
  }
}