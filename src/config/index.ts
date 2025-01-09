import { app_config, AppConfig } from './app.config';
import { auth_config, AuthConfig } from './auth.config';
import { dbs_config, DbsConfig } from './database.config';
import { redis_config, RedisConfig } from './redis.config';

export const configs = [app_config, redis_config, dbs_config, auth_config];

export const services = [AppConfig, RedisConfig, DbsConfig, AuthConfig];

export {
  app_config,
  AppConfig,
  auth_config,
  AuthConfig,
  dbs_config,
  DbsConfig,
  redis_config,
  RedisConfig,
};
