import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { RefreshTokenRepository } from '../repositories';
import { LoginRequestDto, LogoutRequestDto, RegisterRequestDto } from '../dto';
import { UserRepository } from '@/modules/user/repositories';
import { compare, uuid } from '@/common/utils';
import { generateTokensPair, verify } from '@/common/helpers';
import { ConfigService } from '@nestjs/config';
import { TokenSession } from '@/common/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly refreshTokenRepository: RefreshTokenRepository,

    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

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

    const sessionId = uuid();
    const payload = {
      id: user.id,
      email: user.email,
      phone: user.phone,
      fullName: user.fullName,
    };
    const { accessToken, refreshToken } = await generateTokensPair(
      {
        payload,
        accessExpire: this.configService.get<number>(
          'AUTH_ACCESS_TOKEN_EXPIRES',
        ),
      },
      {
        payload: { sessionId, ...payload },
        refreshExpire: this.configService.get<number>(
          'AUTH_REFRESH_TOKEN_EXPIRES',
        ),
      },
      this.configService.get<string>('AUTH_SECRET'),
    );
    console.log({ sessionId, ...payload });

    await this.refreshTokenRepository.createRefreshTokenWithParam({
      userId: user.id,
      token: refreshToken,
      sessionId: sessionId,
    });

    return { accessToken, refreshToken } as TokenSession;
  }

  async logOut(logoutRequest: LogoutRequestDto) {
    const payload = await verify(
      logoutRequest.refreshToken,
      this.configService.get<string>('AUTH_SECRET'),
    );
    console.log(payload);
  }
}
