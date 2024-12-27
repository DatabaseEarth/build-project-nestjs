import { Inject, Injectable } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

export const app_config = registerAs('app', () => ({
  host: process.env.APP_HOST || 'localhost',
  port: Number(process.env.APP_PORT) || 3000,
  api_document: process.env.APP_API_DOCUMENT === 'true',
}));

@Injectable()
export class AppConfig {
  constructor(
    @Inject(app_config.KEY) // Inject cấu hình 'app' vào service thông qua `ConfigType`
    protected readonly config: ConfigType<typeof app_config>, // Đảm bảo kiểu dữ liệu của `config` sẽ tuân theo cấu hình 'app' đã đăng ký
  ) {}

  getHost(): string {
    return this.config.host;
  }

  getPort(): number {
    return this.config.port;
  }

  getApiDocument(): boolean {
    return this.config.api_document;
  }
}
