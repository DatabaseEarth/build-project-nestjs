import { Environment } from "../enums";

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === Environment.DEVELOPMENT;
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === Environment.PRODUCTION;
}
