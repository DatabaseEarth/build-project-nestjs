import { Inject, Injectable } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

export const redis_config = registerAs('redis', () => ({
  host: process.env.REDIS_HOST ?? 'localhost',
  port: Number(process.env.REDIS_PORT) ?? 6379,
  username: process.env.REDIS_USERNAME ?? undefined,
  password: process.env.REDIS_PASSWORD ?? undefined,
}));

@Injectable()
export class RedisConfig {
  constructor(
    @Inject(redis_config.KEY)
    protected readonly config: ConfigType<typeof redis_config>,
  ) {}

  getHost(): string {
    return this.config.host;
  }

  getPort(): number {
    return this.config.port;
  }

  getUsername(): string | undefined {
    return this.config.username;
  }

  getPassword(): string | undefined {
    return this.config.password;
  }
}
