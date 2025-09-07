import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
    port: parseInt(process.env.APP_PORT || '3000', 10),
    host: parseInt(process.env.APP_HOST || '3000', 10),
    logLevel: process.env.LOG_LEVEL || 'info',
}));
