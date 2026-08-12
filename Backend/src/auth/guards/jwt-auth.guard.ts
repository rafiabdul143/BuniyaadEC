// src/auth/guards/jwt-auth.guard.ts

import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException('Access token is invalid or expired.');
    }
    return user;
  }
}