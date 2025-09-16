import { Module } from '@nestjs/common';
import { UserModule } from '../user';
import { AuthController } from './controllers';
import { RefreshTokenRepository } from './repositories';
import { AuthService } from './services';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards';

@Module({
  controllers: [AuthController],
  imports: [JwtModule.registerAsync({
    global: true,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('AUTH_SECRET'),
      // signOptions: {
      //   expiresIn: configService.get<number>(
      //     'AUTH_REFRESH_TOKEN_EXPIRES',
      //   )
      // },
    }),
  }),
    UserModule],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard, }, RefreshTokenRepository, AuthService],
  exports: [AuthService],
})
export class AuthModule { }
