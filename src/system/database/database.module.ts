import { DbsConfig, RedisConfig } from '@config/index';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isProduction } from '@utils/env';
import { join } from 'path';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [RedisConfig, DbsConfig],
      useFactory: async (
        _redis_config: RedisConfig,
        _dbs_config: DbsConfig,
      ): Promise<TypeOrmModuleOptions> => ({
        type: 'mssql',
        host: _dbs_config.getHost(),
        port: _dbs_config.getPort(),
        username: _dbs_config.getUsername(),
        password: _dbs_config.getPassword(),
        database: _dbs_config.getDatabase(),
        autoLoadEntities: true,
        synchronize: false,
        entities: [
          join(__dirname, '../../databases/entities/**/*.entity{.ts,.js}'),
        ],
        // migrations: [__dirname, '../../databases/migrations/**/*.ts'],
        subscribers: [
          join(
            __dirname,
            '../../database/subscribers/**/*.subscriber{.ts,.js}',
          ),
        ],
        logging: !isProduction(),
        cache: {
          type: 'ioredis',
          options: {
            host: _redis_config.getHost(),
            port: _redis_config.getPort(),
            username: _redis_config.getUsername(),
            password: _redis_config.getPassword(),
            db: 1,
          },
        },
        options: {
          encrypt: false,
          connectTimeout: 30000,
        },
      }),
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
