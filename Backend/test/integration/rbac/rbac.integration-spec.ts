import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import * as argon2 from 'argon2';
import { createTestApp } from '../../helpers/test-app';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { cleanTestDatabase } from '../../helpers/test-database';

describe('RBAC Guards & Authorization (Integration)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userToken: string;
  let adminToken: string;

  const uniqueId = Date.now();
  const userEmail = `test.integration.rbac.user.${uniqueId}@buniyaadec.com`;
  const adminEmail = `test.integration.rbac.admin.${uniqueId}@buniyaadec.com`;
  const password = 'StrongPassword123!';

  beforeAll(async () => {
    const testApp = await createTestApp();
    app = testApp.app;
    prisma = app.get(PrismaService);

    const passwordHash = await argon2.hash(password);

    // Ensure roles exist
    await prisma.role.upsert({ where: { name: 'USER' }, update: {}, create: { name: 'USER' } });
    await prisma.role.upsert({ where: { name: 'ADMIN' }, update: {}, create: { name: 'ADMIN' } });

    const userRole = await prisma.role.findUnique({ where: { name: 'USER' } });
    const adminRole = await prisma.role.findUnique({ where: { name: 'ADMIN' } });

    // Seed User
    const dbUser = await prisma.user.create({
      data: {
        email: userEmail,
        passwordHash,
        fullName: 'RBAC User',
        emailVerified: true,
      },
    });
    await prisma.userRole.create({ data: { userId: dbUser.id, roleId: userRole!.id } });

    // Seed Admin
    const dbAdmin = await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash,
        fullName: 'RBAC Admin',
        emailVerified: true,
      },
    });
    await prisma.userRole.create({ data: { userId: dbAdmin.id, roleId: adminRole!.id } });

    // Login to get tokens
    const userRes = await request(app.getHttpServer()).post('/auth/login').send({ email: userEmail, password });
    userToken = userRes.body.accessToken;

    const adminRes = await request(app.getHttpServer()).post('/auth/login').send({ email: adminEmail, password });
    adminToken = adminRes.body.accessToken;
  });

  afterAll(async () => {
    await cleanTestDatabase(prisma, 'test.integration.rbac.');
    await app.close();
  });

  it('should block standard USER from accessing /auth/admin-only (403)', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/admin-only')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(403);
  });

  it('should allow ADMIN to access /auth/admin-only (200)', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/admin-only')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
  });
});