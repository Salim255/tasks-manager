/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ConfigService } from '@nestjs/config';
import { DB_OPTIONS } from 'src/common/constants/constants';
import { DataSourceOptions } from 'typeorm';

export const DatabaseOptionsProvider = {
  provide: DB_OPTIONS,
  inject: [ConfigService],
  useFactory: (config: ConfigService): DataSourceOptions => {
    const get = <T>(key: string, fallback: T): T =>
      config.get<T>(key) ?? fallback;

    const isDev = get('NODE_ENV', 'development') === 'development';

    return {
      type: 'postgres',

      host: isDev ? get('DB_HOST_DEV', '') : get('DB_HOST', ''),

      port: isDev ? get('DB_PORT_DEV', 5432) : get('DB_PORT', 5432),

      username: isDev ? get('DB_USERNAME_DEV', '') : get('DB_USERNAME', ''),

      password: isDev ? get('DB_PASSWORD_DEV', '') : get('DB_PASSWORD', ''),

      database: isDev ? get('DB_NAME_DEV', '') : get('DB_NAME', ''),

      synchronize: false,
      logging: false,
      entities: [__dirname + '/../../modules/**/entity/*.entity{.ts,.js}'],
    };
  },
};
