import {
  SystemRole,
  isSystemRole,
} from '../enums/role.enum';

const ROLE_WEIGHTS: Record<SystemRole, number> = {
  USER: 1,
  ADMIN: 2,
  SUPER_ADMIN: 3,
};

export function hasRequiredRole(
  userRoles: string[],
  requiredRoles: SystemRole[],
): boolean {
  if (!Array.isArray(userRoles) || userRoles.length === 0) {
    return false;
  }

  // Fail closed if any assigned role is invalid
  if (userRoles.some((role) => !isSystemRole(role))) {
    return false;
  }

  // At this point all roles are valid SystemRole values
  const validUserRoles = userRoles as SystemRole[];

  const maxUserWeight = validUserRoles.reduce((max, role) => {
    return Math.max(max, ROLE_WEIGHTS[role]);
  }, 0);

  return requiredRoles.some((requiredRole) => {
    const requiredWeight = ROLE_WEIGHTS[requiredRole];
    return maxUserWeight >= requiredWeight;
  });
}