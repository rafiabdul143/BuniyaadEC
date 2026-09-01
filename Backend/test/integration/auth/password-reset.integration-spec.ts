import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import * as argon2 from 'argon2';
import { createTestApp } from '../../helpers/test-app';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { cleanTestDatabase } from '../../helpers/test-database';
import { EmailService } from '../../../src/email/email.service';

describe('Password Reset Flows (Integration)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let emailServiceMock: jest.Mocked<EmailService>;
  let capturedResetToken: string;
  let userId: string;

  const uniqueId = Date.now();
  const testEmail = `test.integration.pw.${uniqueId}@buniyaadec.com`;
  const testPassword = 'StrongPassword123!';

  beforeAll(async () => {
    const testApp = await createTestApp();

    app = testApp.app;
    emailServiceMock = testApp.emailServiceMock as any;
    prisma = app.get(PrismaService);

    // Ensure the email service mock captures the reset token.
    (emailServiceMock.sendPasswordResetEmail as jest.Mock).mockImplementation(
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
    const mockRefreshTokenHash = await argon2.hash('some-refresh-token');

    const user = await prisma.user.create({
      data: {
        email: testEmail,
        passwordHash: hashedPassword,
        refreshTokenHash: mockRefreshTokenHash,
        fullName: 'Password Reset User',
        emailVerified: true,
        userRoles: {
          create: {
            roleId: role.id,
          },
        },
      },
    });
    
    userId = user.id;
  });

  afterAll(async () => {
    await cleanTestDatabase(prisma, 'test.integration.pw.');
    await app.close();
  });

  it('forgot-password succeeds', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/forgot-password')
      .send({
        email: testEmail,
      });

    expect([200, 201]).toContain(response.status);
    expect(capturedResetToken).toBeTruthy();
    expect(capturedResetToken).toContain(':');
  });

  it('invalid token is rejected', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/reset-password')
      .send({
        token: 'invalid-token-format',
        newPassword: 'NewSecurePassword456!',
      });

    expect(response.status).toBe(400);
  });
  
  it('expired token is rejected', async () => {
    // Modify the token expiration
    const [tokenId] = capturedResetToken.split(':');
    await prisma.passwordResetToken.update({
      where: { id: tokenId },
      data: { expiresAt: new Date(Date.now() - 10000) },
    });
    
    const response = await request(app.getHttpServer())
      .post('/auth/reset-password')
      .send({
        token: capturedResetToken,
        newPassword: 'NewSecurePassword456!',
      });

    expect(response.status).toBe(400);
    
    // Restore expiration
    await prisma.passwordResetToken.update({
      where: { id: tokenId },
      data: { expiresAt: new Date(Date.now() + 15 * 60 * 1000) },
    });
  });
  
  it('valid reset token successfully resets password', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/reset-password')
      .send({
        token: capturedResetToken,
        newPassword: 'NewSecurePassword456!',
      });

    expect([200, 201]).toContain(response.status);
  });
  
  it('successful reset invalidates refreshTokenHash', async () => {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    expect(user?.refreshTokenHash).toBeNull();
  });

  it('already-used token is rejected / reset token cannot be reused', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/reset-password')
      .send({
        token: capturedResetToken,
        newPassword: 'AnotherPassword789!',
      });

    expect(response.status).toBe(400);
  });
});