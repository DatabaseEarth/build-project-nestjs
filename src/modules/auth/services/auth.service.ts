import { AuthConfig } from '@config/auth.config';
import { UserEntity } from '@databases/entities';
import { Injectable } from '@nestjs/common';
import { CacheService } from '@system/cache';
import { DataSource, Repository } from 'typeorm';
import { SignUpRequest } from '../dtos';
import { ValidationException } from '@system/exceptions';
import { _hash } from '@utils';

@Injectable()
export class AuthService {
  protected readonly _auth_config: AuthConfig;
  protected readonly _cache_service: CacheService;

  protected readonly _user_repo: Repository<UserEntity>;
  //   protected readonly _session_repo: Repository<SessionEntity>;

  constructor(
    data_source: DataSource,
    cache_service: CacheService,
    auth_config: AuthConfig,
  ) {
    this._auth_config = auth_config;
    this._cache_service = cache_service;

    this._user_repo = data_source.getRepository(UserEntity);
  }

  async signUp(request: SignUpRequest) {
    if (
      await this._user_repo.exists({
        where: { fullname: request.fullname },
      })
    )
      throw new ValidationException({ username: ['Tên tài khoản đã tồn tại'] });

    if (
      await this._user_repo.exists({
        where: { email: request.email },
      })
    )
      throw new ValidationException({ email: ['Email đã tồn tại'] });

    return await this._user_repo.save(
      this._user_repo.create({
        fullname: request.fullname,
        email: request.email,
        password: await _hash(request.password),
      }),
    );
  }
}
