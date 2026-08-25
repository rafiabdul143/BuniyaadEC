import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { PrismaService } from '../../src/prisma/prisma.service';
import * as argon2 from 'argon2';

export async function createTestUser(
  app: INestApplication,
  overrides?: {
    email?: string;
    password?: string;
    fullName?: string;
    roles?: string[];
  },
) {
  const prisma = app.get(PrismaService);
  const email = overrides?.email || `test_${Date.now()}_${Math.random()}@example.com`;
  const password = overrides?.password || 'Password123!';
  const fullName = overrides?.fullName || 'Test User';
  const roleNames = overrides?.roles || ['USER'];

  const passwordHash = await argon2.hash(password);

  // Ensure system roles exist in the test database
  const roles = await Promise.all(
    roleNames.map(async (name) => {
      return prisma.role.upsert({
        where: { name },
        update: {},
        create: { name },
      });
    }),
  );

  // Safely remove existing user with the same email if left over from prior test runs
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    await prisma.profile.deleteMany({ where: { userId: existingUser.id } }).catch(() => {});
    await prisma.userRole.deleteMany({ where: { userId: existingUser.id } }).catch(() => {});
    await prisma.user.delete({ where: { id: existingUser.id } });
  }

  const user = await prisma.user.create({
    data: {
      email,
      fullName,
      passwordHash,
      emailVerified: true,
      isActive: true,
      userRoles: {
        create: roles.map((role) => ({
          roleId: role.id,
        })),
      },
    },
    include: {
      userRoles: {
        include: {
          role: true,
        },
      },
    },
  });

  return user;
}

export async function getAuthToken(
  app: INestApplication,
  email: string,
  password = 'Password123!',
): Promise<string> {
  const res = await request(app.getHttpServer())
    .post('/auth/login')
    .send({ email, password });

  return res.body.accessToken;
}