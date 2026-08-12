// src/main.ts

import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe with strict security stripping
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips non-whitelisted properties from DTOs
      forbidNonWhitelisted: true, // Throws error if non-whitelisted properties are provided
      transform: true, // Automatically transforms payloads to DTO instances
    }),
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  logger.log(`BuniyaadEC Backend application listening on port ${port}`);
}

void bootstrap();