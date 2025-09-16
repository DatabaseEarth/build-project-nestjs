import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RefreshTokenRepository } from '../repositories';
import { LoginRequestDto, LogoutRequestDto, RegisterRequestDto } from '../dto';
import { UserRepository } from '@/modules/user/repositories';
import { compare, uuid } from '@/common/utils';
import { ConfigService } from '@nestjs/config';
import { TokenSession } from '@/common/interfaces';
import { JwtService } from '@nestjs/jwt';
import { Logger } from 'nestjs-pino';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly logger: Logger,

    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) { }

  async register(registerRequest: RegisterRequestDto) {
    const { email, fullName, password, phone } = registerRequest;

    const user = await this.userRepository.getUserWithFilter({ email });
    if (user) throw new BadRequestException('Email đã tồn tại trong hệ thống!');

    await this.userRepository.createUserWithParam({
      email,
      fullName,
      phone,
      password,
    });
  }

  async login(loginRequest: LoginRequestDto): Promise<TokenSession> {
    const { email, password } = loginRequest;

    const user = await this.userRepository.getUserWithFilter({ email });
    if (!user) throw new BadRequestException('Email hoặc mật khẩu không đúng!');
    if (!(await compare(password, user.password)))
      throw new BadRequestException('Email hoặc mật khẩu không đúng!');

    const payload = {
      id: user.id,
      email: user.email,
      phone: user.phone,
      fullName: user.fullName,
      sessionId: uuid()
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('AUTH_SECRET'),
        expiresIn: Number(this.configService.get<number>(
          'AUTH_ACCESS_TOKEN_EXPIRES',
        ))
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('AUTH_SECRET'),
        expiresIn: Number(this.configService.get<number>(
          'AUTH_REFRESH_TOKEN_EXPIRES',
        ))
      })
    ]);

    await this.refreshTokenRepository.createRefreshTokenWithParam({
      userId: user.id,
      token: refreshToken,
      sessionId: payload.sessionId,
    });

    return { accessToken, refreshToken } as TokenSession;
  }

  async logOut(logoutRequest: LogoutRequestDto): Promise<true> {
    const { refreshToken } = logoutRequest;
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('AUTH_SECRET'),
      })

      await this.refreshTokenRepository.deleteRefreshTokenWithParam({ sessionId: payload.sessionId });
    } catch (error) {
      this.logger.error(error);
      return true;
    }
  }

  async refresh(logoutRequest: LogoutRequestDto): Promise<TokenSession> {
    try {
      const payload = await this.jwtService.verifyAsync(logoutRequest.refreshToken, {
        secret: this.configService.get<string>('AUTH_SECRET'),
      })

      const { iat, exp, ...rest } = payload;
      const sessionId = uuid();
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync({ sessionId, ...rest }, {
          secret: this.configService.get<string>('AUTH_SECRET'),
          expiresIn: Number(this.configService.get<number>(
            'AUTH_ACCESS_TOKEN_EXPIRES',
          ))
        }),
        this.jwtService.signAsync({ sessionId, ...rest }, {
          secret: this.configService.get<string>('AUTH_SECRET'),
          expiresIn: Number(this.configService.get<number>(
            'AUTH_REFRESH_TOKEN_EXPIRES',
          ))
        }),
        this.refreshTokenRepository.deleteRefreshTokenWithParam({ sessionId: payload.sessionId })
      ]);

      await this.refreshTokenRepository.createRefreshTokenWithParam({
        userId: payload.id,
        token: refreshToken,
        sessionId: sessionId,
      });

      return { accessToken, refreshToken } as TokenSession;
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException('Xác thực không thành công!');
    }
  }
}
