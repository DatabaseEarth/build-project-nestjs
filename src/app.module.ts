import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@system/config';
import { CacheModule } from '@system/cache';
import { LoggerModule } from '@system/logger';
import { DatabaseModule } from '@system/databases';

@Module({
  imports: [ConfigModule, CacheModule, LoggerModule, DatabaseModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
