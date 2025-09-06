import { CacheInterceptor, CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createKeyv, Keyv } from '@keyv/redis';
import { CacheableMemory } from 'cacheable';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
    imports: [
        NestCacheModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                stores: [
                    new Keyv({
                        store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
                    }),
                    createKeyv(
                        `redis://${configService.get('REDIS_HOST')}:${configService.get('REDIS_PORT')}`,
                    ),
                ],
            }),
        }),
    ],
    providers: [
        { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
    ],
    exports: [NestCacheModule],
})
export class CacheModule { }
