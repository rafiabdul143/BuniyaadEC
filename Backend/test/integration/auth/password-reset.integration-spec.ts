import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import * as argon2 from 'argon2';
import { createTestApp } from '../../helpers/test-app';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { cleanTestDatabase } from '../../helpers/test-database';

describe('Password Reset Flows (Integration)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let capturedResetToken: string;

  const uniqueId = Date.now();
  const testEmail = `test.integration.pw.${uniqueId}@buniyaadec.com`;
  const testPassword = 'StrongPassword123!';

  beforeAll(async () => {
    const testApp = await createTestApp();

    app = testApp.app;
    const emailServiceMock = testApp.emailServiceMock;
    prisma = app.get(PrismaService);

    // Ensure the email service mock captures the reset token.
    emailServiceMock.sendPasswordResetEmail.mockImplementation(
      (email: string, token: string) => {
        capturedResetToken = token;
        return Promise.resolve(true);
      },
    );

    // Ensure the USER role exists.
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

    // Create the test user.
    const hashedPassword = await argon2.hash(testPassword);

    await prisma.user.create({
      data: {
        email: testEmail,
        passwordHash: hashedPassword,
        fullName: 'Password Reset User',
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
    await cleanTestDatabase(prisma, 'test.integration.pw.');
    await app.close();
  });

  it('should trigger forgot-password email request successfully', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/forgot-password')
      .send({
        email: testEmail,
      });

    expect([200, 201]).toContain(response.status);
  });

  it('should successfully reset password with valid token', async () => {
    // Fallback in case the reset token is stored directly on the database model.
    const dbUser = await prisma.user.findUnique({
      where: {
        email: testEmail,
      },
    });

    const tokenToUse =
      capturedResetToken || (dbUser as any)?.resetPasswordToken;

    expect(tokenToUse).toBeTruthy();

    const response = await request(app.getHttpServer())
      .post('/auth/reset-password')
      .send({
        token: tokenToUse,
        newPassword: 'NewSecurePassword456!',
      });

    expect([200, 201]).toContain(response.status);
  });
});