import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from '../../helpers/test-app';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { cleanTestDatabase } from '../../helpers/test-database';

describe('POST /auth/verify-email (Integration)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let capturedOtp: string;
  const uniqueId = Date.now();
  const testEmail = `test.integration.verify.${uniqueId}@buniyaadec.com`;

  beforeAll(async () => {
    const testApp = await createTestApp();
    app = testApp.app;
    prisma = app.get(PrismaService);

    // Mock email service to capture OTP using the correct parameter signature
    testApp.emailServiceMock.sendVerificationOtp.mockImplementation(
      (email, fullName, otp) => {
        capturedOtp = otp;
        return Promise.resolve(true);
      },
    );

    // Register user to trigger verification generation
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: testEmail,
        password: 'StrongPassword123!',
        fullName: 'Verify Tester',
      });
  });

  afterAll(async () => {
    await cleanTestDatabase(prisma, 'test.integration.verify.');
    await app.close();
  });

  it('should fail email verification with incorrect OTP', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/verify-email')
      .send({ email: testEmail, otp: '000000' });

    expect(response.status).toBe(400);
  });

  it('should successfully verify email with valid captured OTP', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/verify-email')
      .send({ email: testEmail, otp: capturedOtp });

    expect(response.status).toBe(200);

    const updatedUser = await prisma.user.findUnique({ where: { email: testEmail } });
    expect(updatedUser?.emailVerified).toBe(true);
  });
});