import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { createSwaggerDocument } from './swagger';
import compression from 'compression';
import { isProduction } from '@/common/utils/env';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    logger: isProduction()
      ? ['log', 'error']
      : ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  app.use(compression());
  app.enableCors({
    origin: true, // 'http://localhost:5173'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.use(
    helmet({
      xssFilter: true,
      hidePoweredBy: true,
    }),
  );
  app.useBodyParser('json', { limit: '50mb' });
  app.useBodyParser('urlencoded', { extended: true, limit: '50mb' });

  // TODO: viết Logger

  createSwaggerDocument(app);

  await app.listen(3000, '0.0.0.0', () => {
    console.log(`Application listen in ${3000}`);
  });
}

bootstrap();
