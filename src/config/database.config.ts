import { Inject, Injectable } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

export const dbs_config = registerAs('dbs', () => ({
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT) ?? 5432,
  username: process.env.DB_USERNAME ?? '',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_DATABASE ?? '',
  ssl: process.env.DB_SSL,
}));

@Injectable()
export class DbsConfig {
  constructor(
    @Inject(dbs_config.KEY)
    protected readonly config: ConfigType<typeof dbs_config>,
  ) {}

  getHost(): string {
    return this.config.host;
  }

  getPort(): number {
    return this.config.port;
  }

  getUsername(): string {
    return this.config.username;
  }

  getPassword(): string {
    return this.config.password;
  }

  getDatabase(): string {
    return this.config.database;
  }

  getSsl(): string {
    return this.config.ssl;
  }
}
