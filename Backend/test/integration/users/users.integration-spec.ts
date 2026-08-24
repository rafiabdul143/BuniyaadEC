import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import * as argon2 from 'argon2';
import { createTestApp } from '../../helpers/test-app';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { cleanTestDatabase } from '../../helpers/test-database';

describe('Users Module (Integration)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let accessToken: string;
  const uniqueId = Date.now();
  const testEmail = `test.integration.users.${uniqueId}@buniyaadec.com`;
beforeAll(async () => {
    const testApp = await createTestApp();
    app = testApp.app;
    prisma = app.get(PrismaService);

    // 1. Ensure the USER role exists
    const role = await prisma.role.upsert({
      where: { name: 'USER' },
      update: {},
      create: { name: 'USER', description: 'Standard User Role' },
    });

    const passwordHash = await argon2.hash('StrongPassword123!');
    await prisma.user.create({
      data: {
        email: testEmail,
        passwordHash,
        fullName: 'Users Module User',
        emailVerified: true,
        userRoles: {
          create: { roleId: role.id },
        },
      },
    });

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: testEmail, password: 'StrongPassword123!' });

    accessToken = loginRes.body.accessToken;
  });

  afterAll(async () => {
    await cleanTestDatabase(prisma, 'test.integration.users.');
    await app.close();
  });

  it('GET /auth/me - should return profile data for authenticated user', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user.email).toBe(testEmail);
  });

  it('GET /auth/me - should fail with 401 when token is absent', async () => {
    const response = await request(app.getHttpServer()).get('/auth/me');
    expect(response.status).toBe(401);
  });
});