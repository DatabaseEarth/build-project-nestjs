import { Module } from '@nestjs/common';
import { UserModule } from '../user';
import { AuthController } from './controllers';
import { RefreshTokenRepository } from './repositories';
import { AuthService } from './services';

@Module({
  controllers: [AuthController],
  imports: [UserModule],
  providers: [RefreshTokenRepository, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
