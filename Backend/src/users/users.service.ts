// src/users/users.service.ts
import { BadRequestException } from '@nestjs/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Find user by ID (Safe projection - omits sensitive hash fields).
   */
  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        fullName: true,
        isActive: true,
        emailVerified: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" was not found.`);
    }

    return {
      ...user,
      roles: user.userRoles.map((ur) => ur.role.name),
    };
  }

  /**
   * Internal lookup method for authentication.
   * Includes passwordHash and userRoles.
   */
  async findByEmailWithPassword(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  /**
   * Internal lookup method for refresh token verification.
   * Includes refreshTokenHash and userRoles.
   */
async findByIdWithRefreshToken(userId: string) {
  if (!userId) {
    throw new BadRequestException('User ID is required');
  }

  return this.prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      fullName: true,
      isActive: true,
      refreshTokenHash: true,
      userRoles: {
        include: {
          role: true,
        },
      },
    },
  });
}
  /**
   * Creates a new user record and assigns the default 'USER' role.
   */
  async create(data: { fullName: string; email: string; passwordHash: string }) {
    const defaultRole = await this.prisma.role.findUnique({
      where: { name: 'USER' },
    });

    return this.prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          fullName: data.fullName,
          email: data.email,
          passwordHash: data.passwordHash,
        },
      });

      if (defaultRole) {
        await tx.userRole.create({
          data: {
            userId: newUser.id,
            roleId: defaultRole.id,
          },
        });
      }

      return {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        isActive: newUser.isActive,
        emailVerified: newUser.emailVerified,
        createdAt: newUser.createdAt,
      };
    });
  }

  /**
   * Updates last login timestamp for the user.
   */
  async updateLastLogin(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { lastLoginAt: new Date() },
    });
  }

  /**
   * Stores or clears the hashed refresh token in the database.
   */
async updateRefreshTokenHash(userId: string, refreshTokenHash: string | null): Promise<void> {
  if (!userId) {
    throw new BadRequestException('User ID is required to update refresh token hash');
  }

  await this.prisma.user.update({
    where: { id: userId },
    data: { refreshTokenHash },
  });
}
}