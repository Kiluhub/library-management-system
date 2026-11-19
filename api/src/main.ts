import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule, ObserveInstrument } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  // Enable validation for incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Enable Cross-Origin Resource Sharing
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();