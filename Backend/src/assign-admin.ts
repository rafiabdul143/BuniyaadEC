// src/assign-super-admin.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const prisma = app.get(PrismaService);

  const email = 'mohdabdulnadir17@gmail.com';

  // 1. Ensure SUPER_ADMIN role exists
  let superAdminRole = await prisma.role.findUnique({
    where: { name: 'SUPER_ADMIN' },
  });

  if (!superAdminRole) {
    superAdminRole = await prisma.role.create({
      data: {
        name: 'SUPER_ADMIN',
        description: 'Super Administrator Role',
      },
    });

    console.log('Created SUPER_ADMIN role in roles table.');
  }

  // 2. Find user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.error(`User with email ${email} not found!`);
    await app.close();
    return;
  }

  // 3. Assign SUPER_ADMIN role
  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: user.id,
        roleId: superAdminRole.id,
      },
    },
    create: {
      userId: user.id,
      roleId: superAdminRole.id,
    },
    update: {},
  });

  console.log(`✅ Successfully assigned SUPER_ADMIN role to ${email}!`);

  await app.close();
}

bootstrap();