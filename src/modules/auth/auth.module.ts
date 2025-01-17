import { forwardRef, Global, Module } from '@nestjs/common';
import { CacheModule } from '@system/cache';
import { AuthController } from './controllers';
import { AuthService } from './services';
import { UserModule } from '@modules/user/user.module';
import {
  AccessTokenProvider,
  BlackListProvider,
  RefreshTokenProvider,
} from './providers';
import {
  AccessTokenRepository,
  BlackListRepository,
  RefreshTokenRepository,
} from './repositories';
import { JwtAuthGuard } from './guards';

@Global()
@Module({
  imports: [CacheModule, forwardRef(() => UserModule)],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenProvider,
    AccessTokenRepository,
    RefreshTokenProvider,
    RefreshTokenRepository,
    BlackListProvider,
    BlackListRepository,
    JwtAuthGuard,
  ],
  exports: [
    AuthService,
    AccessTokenProvider,
    AccessTokenRepository,
    RefreshTokenProvider,
    RefreshTokenRepository,
    BlackListProvider,
    BlackListRepository,
    JwtAuthGuard,
  ],
})
export class AuthModule {}
