import { Global, Module } from '@nestjs/common';
import { LoggerService } from './services';

@Global()
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
