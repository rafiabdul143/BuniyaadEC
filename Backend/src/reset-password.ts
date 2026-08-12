// src/reset-password.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import * as argon2 from 'argon2';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const prisma = app.get(PrismaService);

  const email = 'mohdabdulnadir17@gmail.com';
  const newPassword = 'Password123!';

  try {
    // 1. Hash the new password using Argon2
    const passwordHash = await argon2.hash(newPassword);

    // 2. Find the existing user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.error(`❌ User with email ${email} not found.`);
      return;
    }

    // 3. Update password and ensure account is active/verified
    await prisma.user.update({
      where: { email },
      data: {
        passwordHash,
        emailVerified: true,
        isActive: true,
      },
    });

    console.log(`✅ Password successfully reset for ${email}`);
    console.log(`🔑 New password: ${newPassword}`);
    console.log(`🛡️ Existing roles were preserved.`);
  } catch (error) {
    console.error('❌ Failed to reset password:', error);
  } finally {
    await app.close();
  }
}

bootstrap();