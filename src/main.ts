import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AllExceptionFilter } from '@system/filters';
import cookieParser from 'cookie-parser';
import { AppConfig } from './config';
import { LoggerService } from '@system/logger';
import helmet from 'helmet';
import { TypeORMExceptionFilter } from '@system/database/exceptions';
import { ValidationPipe } from '@nestjs/common';
import { ValidationException } from '@system/exceptions';
import { ValidationError } from 'class-validator';
import { createSwaggerDocument } from './swagger';
import { isProduction } from '@utils/env';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    logger: isProduction()
      ? ['log', 'error']
      : ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  // #region INJECT CONFIGS
  const _app_config = app.get(AppConfig);
  const _logger = app.get(LoggerService);
  const _http = app.get(HttpAdapterHost);
  // #endregion

  // #region CONFIGURE APP
  app.enableCors({
    origin: true, // 'http://localhost:5173'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.use(cookieParser());

  app.setGlobalPrefix('api');

  app.useLogger(_logger);

  app.use(
    helmet({
      xssFilter: true,
      hidePoweredBy: true,
    }),
  );

  app.useBodyParser('json', { limit: '50mb' });
  app.useBodyParser('urlencoded', { extended: true, limit: '50mb' });

  app.useGlobalFilters(
    new AllExceptionFilter(_http),
    new TypeORMExceptionFilter(_http),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) =>
        new ValidationException(null, errors),
    }),
  );
  // #endregion

  // #region SET SWAGGER
  if (_app_config.getApiDocument()) {
    createSwaggerDocument(app);
  }
  // #endregion

  const port = _app_config.getPort();
  const host = _app_config.getHost();

  await app.listen(port, host, () => {
    _logger.log(`Application listen in ${port}`);
  });
}

bootstrap();
