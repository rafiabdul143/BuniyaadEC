// src/users/dto/create-user-internal.dto.ts

/**
 * Internal service contract for user creation.
 * Passed exclusively from AuthService to UsersService.
 * NEVER contains raw passwords.
 */
export class CreateUserInternalDto {
  fullName!: string;
  email!: string;
  passwordHash!: string;
}