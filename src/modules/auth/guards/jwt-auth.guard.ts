import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../services';
import { AuthConfig } from '@config';
import { CacheService } from '@system/cache';
import { Request } from 'express';
import { verify } from '../utils';
import { AccessTokenProvider, BlackListProvider } from '../providers';
import { UserService } from '@modules/user/services';
import { ISessionToken, IUserCurrent } from '../interfaces';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    protected readonly _auth_service: AuthService,
    protected readonly _access_token_provider: AccessTokenProvider,
    protected readonly _black_list_provider: BlackListProvider,
    protected readonly _auth_config: AuthConfig,
    protected readonly _cache_service: CacheService,

    @Inject(UserService)
    protected readonly _user_service: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const { access_token, refresh_token } = await this.extractTokens(request);
    if (!access_token)
      throw new UnauthorizedException('Không tìm thấy mã để xác thực');
    try {
      if (!(await this._access_token_provider.getSessionByToken(access_token)))
        throw new UnauthorizedException('Không tìm thấy mã để xác thực');
      if (await this._black_list_provider.getBlackListByToken(access_token))
        throw new UnauthorizedException('Tài khoản đã đăng xuất');

      const secret = this._auth_config.getSecret();
      const payload = await verify(access_token, secret);
      if (payload && payload.id && !(await this._cache_service.get(payload.id)))
        throw new UnauthorizedException(
          'Xác thực dữ liệu tài khoản không thành công',
        );

      const dataUser = await this._user_service.GetOneByEmail(payload.email);
      const user: IUserCurrent = {
        id: dataUser.id,
        fullname: dataUser.fullname,
        email: dataUser.email,
        avatar: dataUser.avatar,
        address: dataUser.address,
        mobile: dataUser.mobile,
        birthday: dataUser.birthday,
        role: dataUser.role,
        status: dataUser.status,
      };
      const sessionToken: ISessionToken = {
        access_token,
        refresh_token,
      };
      request['_user'] = user;
      request['_session_token'] = sessionToken;
    } catch (error) {
      throw new UnauthorizedException('Xác thực tài khoản không thành công');
    }

    return true;
  }

  protected async extractTokens(request: Request) {
    let accessToken: string = '';
    let refreshToken: string = '';
    const [type, tokenBear] = request.headers.authorization?.split(' ') || [];

    if (type === 'Bearer' && tokenBear?.trim().length) {
      accessToken = tokenBear;
    } else {
      accessToken =
        request.cookies?.[this._auth_config.getAccessCookieName()] ?? undefined;
    }
    refreshToken =
      request.cookies?.[this._auth_config.getRefreshCookieName()] ?? undefined;

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
