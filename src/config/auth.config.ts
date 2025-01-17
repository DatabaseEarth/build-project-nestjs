import { Inject, Injectable } from '@nestjs/common';
import { registerAs, ConfigType } from '@nestjs/config';

export const auth_config = registerAs('auth', () => ({
  access_cookie_name: process.env.AUTH_ACCESS_COOKIE_NAME ?? '__access_session',
  access_token: Number(process.env.AUTH_ACCESS_TOKEN_EXPIRES) ?? 900,
  refresh_cookie_name:
    process.env.AUTH_REFRESH_COOKIE_NAME ?? '__refresh_session',
  refresh_token: Number(process.env.AUTH_REFRESH_TOKEN_EXPIRES) ?? 86400,
  secret: process.env.AUTH_SECRET ?? '__secret',
}));
@Injectable()
export class AuthConfig {
  constructor(
    @Inject(auth_config.KEY)
    protected readonly config: ConfigType<typeof auth_config>,
  ) {}

  getAccessExpires(): number {
    return this.config.access_token;
  }

  getRefreshExpires(): number {
    return this.config.refresh_token;
  }

  getAccessCookieName(): string {
    return this.config.access_cookie_name;
  }

  getRefreshCookieName(): string {
    return this.config.refresh_cookie_name;
  }

  getSecret(): string {
    return this.config.secret;
  }
}
