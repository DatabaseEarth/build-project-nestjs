import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { modules } from './modules';
import { AppService } from '@/app.service';
import { ConfigModule } from '@nestjs/config';
import {
  appConfig,
  configuration,
  databaseConfig,
  validationSchema,
} from '@/configuration';
import { infrastructure } from './infrastructure';
import { CoreModule } from './core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [configuration, appConfig, databaseConfig],
      validationSchema: validationSchema,
      expandVariables: true,
      cache: true,
    }),
    CoreModule,
    ...infrastructure,
    ...modules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
