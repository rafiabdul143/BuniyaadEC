import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from '../../helpers/test-app';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { cleanTestDatabase } from '../../helpers/test-database';

describe('POST /auth/register (Integration)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const uniqueId = Date.now();
  const testEmail = `test.integration.reg.${uniqueId}@buniyaadec.com`;

  beforeAll(async () => {
    const testApp = await createTestApp();

    app = testApp.app;
    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    await cleanTestDatabase(prisma, 'test.integration.reg.');
    await app.close();
  });

  it('should reject registration with duplicate email', async () => {
    // 1. First registration (should succeed)
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: testEmail,
        password: 'Password123!',
        fullName: 'Original User',
      });

    // 2. Second registration with the same email (should fail with 409)
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: testEmail,
        password: 'Password123!',
        fullName: 'Duplicate User',
      });

    expect(response.status).toBe(409);
  });
});