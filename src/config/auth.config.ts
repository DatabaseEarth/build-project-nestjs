import { Inject, Injectable } from "@nestjs/common";
import { registerAs, ConfigType } from '@nestjs/config';

export const auth_config = registerAs('auth', () => ({
    token_expires: process.env.AUTH_TOKEN_EXPIRES ?? '24h',
    access_cookie_name: process.env.AUTH_ACCESS_COOKIE_NAME ?? '__access_session',
    refresh_cookie_name: process.env.AUTH_REFRESH_COOKIE_NAME ?? '__refresh_session'
}))
@Injectable()
export class AuthConfig {
    constructor(
        @Inject(auth_config.KEY)
        protected readonly config: ConfigType<typeof auth_config>
    ) {}

    getTokenExpires(): string {
        return this.config.token_expires;
    }

    getAccessCookieName(): string {
        return this.config.access_cookie_name;
    }
}