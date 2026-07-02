import { ConfigService } from '@nestjs/config';
export const quoteIfNeeded = (key: string) => {
  return /[A-Z]/.test(key) ? `"${key}"` : key;
};

export function getEnvVar<T>(
  key: string, 
  fallback: T, 
  configService: ConfigService
): T {
  return configService.get<T>(key) ?? fallback;
}
