import { CacheModule } from './cache';
import { LoggerModule } from './logger';

export const infrastructure = [LoggerModule, CacheModule];
