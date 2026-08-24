import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import * as argon2 from 'argon2';
import { createTestApp } from '../../helpers/test-app';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { cleanTestDatabase } from '../../helpers/test-database';

describe('POST /auth/login (Integration)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const uniqueId = Date.now();
  const testEmail = `test.integration.login.${uniqueId}@buniyaadec.com`;
  const testPassword = 'StrongPassword123!';

  beforeAll(async () => {
    const testApp = await createTestApp();

    app = testApp.app;
    prisma = app.get(PrismaService);

    // 1. Ensure the USER role exists
    const role = await prisma.role.upsert({
      where: {
        name: 'USER',
      },
      update: {},
      create: {
        name: 'USER',
        description: 'Standard User Role',
      },
    });

    // 2. Create test user
    const passwordHash = await argon2.hash(testPassword);

    await prisma.user.create({
      data: {
        email: testEmail,
        passwordHash,
        fullName: 'Login Test User',
        emailVerified: true,
        userRoles: {
          create: {
            roleId: role.id,
          },
        },
      },
    });
  });

  afterAll(async () => {
    await cleanTestDatabase(prisma, 'test.integration.login.');
    await app.close();
  });

  it('should successfully login with valid credentials', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: testEmail,
        password: testPassword,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
  });

  it('should reject login with wrong password (401)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: testEmail,
        password: 'WrongPassword999!',
      });

    expect(response.status).toBe(401);
  });
});