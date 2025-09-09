import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { createSwaggerDocument } from './swagger';
import compression from 'compression';
import { isProduction } from '@/common/utils/env';
import 'reflect-metadata';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    logger: isProduction()
      ? ['log', 'error']
      : ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);
  const loggerService = app.get(Logger);
  app.useLogger(app.get(Logger));
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
  createSwaggerDocument(app);

  const port: number = configService.get<number>('app.port');
  const host: string = configService.get<string>('app.host');
  await app.listen(port, host, () => {
    loggerService.log(`Application listen in ${port}`);
  });
}

bootstrap();
