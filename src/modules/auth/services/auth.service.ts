import { AuthConfig } from '@config/auth.config';
import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CacheService } from '@system/cache';
import { SignInRequest, SignUpRequest } from '../dtos/requests';
import { ValidationException } from '@system/exceptions';
import { _compare, _hash, generateTokensPair, verify } from '../utils';
import { uuid } from '@utils';
import ms from 'ms';
import { UserService } from '@modules/user/services';
import { IPayloadToken, ISessionToken, IUserCurrent } from '../interfaces';
import {
  AccessTokenProvider,
  BlackListProvider,
  RefreshTokenProvider,
} from '../providers';
import { UserStatus } from '@common';

@Injectable()
export class AuthService {
  protected readonly _auth_config: AuthConfig;
  protected readonly _cache_service: CacheService;

  constructor(
    cache_service: CacheService,
    auth_config: AuthConfig,

    @Inject(UserService)
    private readonly _user_service: UserService,
    private readonly _access_token_provider: AccessTokenProvider,
    private readonly _refresh_token_provider: RefreshTokenProvider,
    private readonly _black_list_provider: BlackListProvider,
  ) {
    this._auth_config = auth_config;
    this._cache_service = cache_service;
  }

  async signUp(request: SignUpRequest) {
    const checkFullName = await this._user_service.GetOneByFullName(
      request.fullname,
    );
    if (checkFullName)
      throw new ValidationException({ username: ['Tên tài khoản đã tồn tại'] });

    const checkemail = await this._user_service.GetOneByEmail(request.email);
    if (checkemail)
      throw new ValidationException({ email: ['Email đã tồn tại'] });

    return await this._user_service.save(
      request.fullname,
      request.email,
      request.password,
    );
  }

  async signIn(request: SignInRequest) {
    const user = await this._user_service.GetOneByEmail(request.email);
    if (!user) {
      throw new HttpException('Tài khoản không tồn tại!', HttpStatus.NOT_FOUND);
    }
    if (user.status === UserStatus.DISABLED) {
      throw new HttpException('Tài khoản đã bị khóa!', HttpStatus.FORBIDDEN);
    }

    if (!user || !(await _compare(request.password, user.password)))
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng!');

    const auth_id = uuid();

    const secret = this._auth_config.getSecret();
    const time_access_expire = this._auth_config.getAccessExpires();
    const time_refresh_expire = this._auth_config.getRefreshExpires();

    const payload: IPayloadToken = {
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      id: `auth:${auth_id}`,
      status: user.status,
    };

    const { access_token, refresh_token } = await generateTokensPair(
      payload,
      secret,
      time_access_expire,
      time_refresh_expire,
    );

    await this._cache_service.set(payload.id, payload, time_access_expire);
    await this._access_token_provider.save(access_token, user.id, secret);
    await this._refresh_token_provider.save(refresh_token, user.id, secret);

    const SessionToken: ISessionToken = { access_token, refresh_token };

    const userData: IUserCurrent = {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      avatar: user.avatar,
      address: user.address,
      mobile: user.mobile,
      birthday: user.birthday,
      role: user.role,
      status: user.status,
    };
    const result = {
      userData,
      SessionToken,
    };
    return result;
  }

  async signOut(user: IUserCurrent, sessionToken: ISessionToken) {
    const secret = this._auth_config.getSecret();
    const { access_token, refresh_token } = sessionToken;
    const payload = await verify(access_token, secret);
    await this._refresh_token_provider.updateStatusRevoked(refresh_token);
    await this._black_list_provider.save(access_token, user.id);
    await this._cache_service.del(payload.id);
  }

  async refreshToken(user: IUserCurrent, sessionToken: ISessionToken) {
    const secret = this._auth_config.getSecret();
    const time_access_expire = this._auth_config.getAccessExpires();
    const time_refresh_expire = this._auth_config.getRefreshExpires();
    const auth_id = uuid();

    const { refresh_token } = sessionToken;
    const payloadDecoded = await verify(refresh_token, secret);
    if (!payloadDecoded)
      throw new UnauthorizedException(
        'Mã xác thực không đúng, hoặc đã hết thời gian!',
      );

    await this._black_list_provider.save(sessionToken.access_token, user.id);

    const payloadData: IPayloadToken = {
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      id: `auth:${auth_id}`,
      status: user.status,
    };

    const { access_token } = await generateTokensPair(
      payloadData,
      secret,
      time_access_expire,
      time_refresh_expire,
    );

    await this._cache_service.del(payloadDecoded.id);
    await this._cache_service.set(
      payloadData.id,
      payloadData,
      time_access_expire,
    );
    await this._access_token_provider.save(access_token, user.id, secret);
    return access_token;
  }
}
