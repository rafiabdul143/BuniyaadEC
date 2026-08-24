import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { EmailService } from '../../src/email/email.service';

export async function createTestApp(): Promise<{
  app: INestApplication;
  emailServiceMock: {
    sendVerificationOtp: jest.Mock;
    sendPasswordResetOtp: jest.Mock;
    sendVerificationEmail: jest.Mock;
    sendPasswordResetEmail: jest.Mock;
  };
}> {
  const emailServiceMock = {
    sendVerificationOtp: jest.fn().mockResolvedValue(true),
    sendPasswordResetOtp: jest.fn().mockResolvedValue(true),
    sendVerificationEmail: jest.fn().mockResolvedValue(true),
    sendPasswordResetEmail: jest.fn().mockResolvedValue(true),
  };

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(EmailService)
    .useValue(emailServiceMock)
    .compile();

  const app = moduleFixture.createNestApplication();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.init();

  return {
    app,
    emailServiceMock,
  };
}