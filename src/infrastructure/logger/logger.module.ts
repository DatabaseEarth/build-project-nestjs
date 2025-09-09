import { Module, RequestMethod } from '@nestjs/common';
import {
  LoggerErrorInterceptor,
  LoggerModule as PinoLoggerModule,
} from 'nestjs-pino';
import path from 'path';
import { isProduction } from '@/common/utils';
import { ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const today = new Date().toISOString().split('T')[0];
        const logFile = path.join(process.cwd(), 'logs', `app-${today}.log`);
        return {
          pinoHttp: {
            level: configService.get<string>('LOG_LEVEL'),
            autoLogging: true,
            transport: !isProduction()
              ? {
                  level: 'info',
                  target: 'pino-pretty',
                  options: {
                    colorize: true,
                    singleLine: false,
                    translateTime: 'yyyy-mm-dd HH:MM:ss', // SYS:standard
                  },
                }
              : {
                  target: 'pino-roll',
                  options: {
                    file: logFile,
                    frequency: 'daily',
                    compress: 'gzip',
                    mkdir: true,
                    limit: { count: 7 },
                    symlink: false,
                  },
                },
          },
          forRoutes: ['{*splat}'],
          exclude: [{ method: RequestMethod.ALL, path: 'health' }],
        };
      },
    }),
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoggerErrorInterceptor }],
})
export class LoggerModule {}
