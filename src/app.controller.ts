import { AppConfig } from '@config/index';
import { RedisConfig } from '@config/index';
import { Controller, Get } from '@nestjs/common';
import { CacheService } from '@system/cache';

@Controller()
export class AppController {
  constructor(
    protected readonly ConfigService: AppConfig,
    protected readonly RedisService: RedisConfig,
    protected readonly RedisServiceReal: CacheService,
  ) {}

  @Get()
  async getHello() {
    // const data = await this.RedisServiceReal.get('hi');
    return {
      host: this.ConfigService.getHost(),
      port: this.ConfigService.getPort(),
      //   apiDocument: this.appService.getApiDocument(),
      redisHost: this.RedisService.getHost(),
      redisPort: this.RedisService.getPort(),

      // redisService: data,
    };
  }
}
