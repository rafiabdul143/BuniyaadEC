import { Role, UserRole } from '@prisma/client';

export type RoleName = 'USER' | 'ADMIN' | 'SUPER_ADMIN';

export const RoleEnum: Record<RoleName, RoleName> = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
};

export type UserRoleRelation = UserRole & {
  role: Role;
};

// Flexible interface that works with both full User objects and partial Prisma `select` results
export interface UserWithRolesInput {
  id: string;
  email: string;
  userRoles?: UserRoleRelation[] | { role: { name: string } }[];
}

export interface JwtPayload {
  sub: string;
  email: string;
  roles: RoleName[];
  iat?: number;
  exp?: number;
}

export interface AuthenticatedUser {
  userId: string;
  email: string;
  roles: RoleName[];
}