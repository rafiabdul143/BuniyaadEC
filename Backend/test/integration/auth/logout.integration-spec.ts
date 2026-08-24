import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import * as argon2 from 'argon2';
import { createTestApp } from '../../helpers/test-app';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { cleanTestDatabase } from '../../helpers/test-database';

describe('POST /auth/logout (Integration)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let accessToken: string;
  const uniqueId = Date.now();
  const testEmail = `test.integration.logout.${uniqueId}@buniyaadec.com`;
  const testPassword = 'StrongPassword123!';

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

    const passwordHash = await argon2.hash(testPassword);
    await prisma.user.create({
      data: {
        email: testEmail,
        passwordHash,
        fullName: 'Logout Test User',
        emailVerified: true,
        userRoles: {
          create: { roleId: role.id },
        },
      },
    });

    // 2. Log in to get the valid Bearer token
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: testEmail, password: testPassword });

    accessToken = loginRes.body.accessToken;
  });

  afterAll(async () => {
    await cleanTestDatabase(prisma, 'test.integration.logout.');
    await app.close();
  });

  it('should successfully log out an authenticated user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/logout')
      .set('Authorization', `Bearer ${accessToken}`); // No body needed

    expect(response.status).toBe(200);
  });
});