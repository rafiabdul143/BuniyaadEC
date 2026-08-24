import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import * as argon2 from 'argon2';
import { createTestApp } from '../../helpers/test-app';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { cleanTestDatabase } from '../../helpers/test-database';

describe('POST /auth/refresh (Integration)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let refreshToken: string;
  const uniqueId = Date.now();
  const testEmail = `test.integration.refresh.${uniqueId}@buniyaadec.com`;
  const testPassword = 'StrongPassword123!';

  beforeAll(async () => {
    const testApp = await createTestApp();
    app = testApp.app;
    prisma = app.get(PrismaService);

    const role = await prisma.role.upsert({
      where: { name: 'USER' },
      update: {},
      create: { name: 'USER', description: 'Standard User Role' },
    });

    const passwordHash = await argon2.hash(testPassword);
    await prisma.user.create({
      data: {
        email: testEmail,
        passwordHash,
        fullName: 'Refresh Token User',
        emailVerified: true,
        userRoles: {
          create: {
            roleId: role.id,
          },
        },
      },
    });

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: testEmail, password: testPassword });

    refreshToken = loginRes.body.refreshToken;
  });

  afterAll(async () => {
    await cleanTestDatabase(prisma, 'test.integration.refresh.');
    await app.close();
  });

  it('should successfully rotate tokens using a valid refresh token', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/refresh')
      .send({ refreshToken });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
  });

  it('should reject invalid or malformed refresh token', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/refresh')
      .send({ refreshToken: 'invalid-token-string' });

    expect(response.status).toBe(403);
  });
});