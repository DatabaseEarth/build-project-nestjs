import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) protected readonly _cache: Cache) {}

  get<T>(key: string) {
    return this._cache.get<T>(key);
  }

  set(key: string, value: any, ttl?: number) {
    // ttl is seconds => convert to milliseconds
    return this._cache.set(key, value, ttl ? ttl * 1000 : undefined);
  }

  del(key: string) {
    return this._cache.del(key);
  }
}
