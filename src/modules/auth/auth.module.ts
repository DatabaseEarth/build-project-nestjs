import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@system/cache';
import { AuthController } from './controllers';
import { AuthService } from './services';

@Global()
@Module({
  imports: [CacheModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
