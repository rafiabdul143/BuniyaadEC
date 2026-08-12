// src/auth/enums/role.enum.ts
export const SYSTEM_ROLES = ['USER', 'ADMIN', 'SUPER_ADMIN'] as const;
export type SystemRole = (typeof SYSTEM_ROLES)[number];

export function isSystemRole(value: string): value is SystemRole {
  return SYSTEM_ROLES.includes(value as SystemRole);
}