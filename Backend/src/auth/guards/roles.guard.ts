import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { AuthenticatedUser, RoleName } from '../interfaces/authenticated-user.interface';

const ROLE_HIERARCHY: Record<RoleName, number> = {
  USER: 1,
  ADMIN: 2,
  SUPER_ADMIN: 3,
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleName[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles are specified on the route, permit access (authentication is handled by JwtAuthGuard)
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as AuthenticatedUser;

    // Fail-closed check: Ensure user context and roles exist
    if (!user || !Array.isArray(user.roles) || user.roles.length === 0) {
      throw new ForbiddenException('Access denied: User roles missing from request context.');
    }

    // Validate that all roles present on the user are recognized system roles
    const validRoleKeys = Object.keys(ROLE_HIERARCHY) as RoleName[];
    const hasUnrecognizedRole = user.roles.some((role) => !validRoleKeys.includes(role as RoleName));
    if (hasUnrecognizedRole) {
      throw new ForbiddenException('Access denied: Unrecognized role detected in user session.');
    }

    // Calculate the user's highest privilege rank based on their assigned roles
    const userMaxWeight = Math.max(
      ...user.roles.map((role) => ROLE_HIERARCHY[role as RoleName] || 0)
    );

    // Check if the user's highest rank satisfies at least one of the required roles' hierarchy ranks
    const isAuthorized = requiredRoles.some((requiredRole) => {
      const requiredWeight = ROLE_HIERARCHY[requiredRole] || Infinity;
      return userMaxWeight >= requiredWeight;
    });

    if (!isAuthorized) {
      throw new ForbiddenException('Access denied: Insufficient hierarchical privileges.');
    }

    return true;
  }
}