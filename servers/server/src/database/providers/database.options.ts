import { ConfigService } from '@nestjs/config';
import { DB_OPTIONS } from 'src/common/constants/constants';
import { DataSourceOptions } from 'typeorm';

export const DatabaseOptionsProvider = {
  provide: DB_OPTIONS,
  inject: [ConfigService],
  useFactory: (config: ConfigService): DataSourceOptions => {
    const getValue = <T>(key: string, fb: T): T => config.get<T>(key) ?? fb;

    const isDev = getValue('NODE_ENV', 'development') === 'development';

    return {
      type: 'postgres',

      host: isDev
        ? getValue('DB_HOST_DEV', '')
        : getValue<string>('DB_HOST', ''),

      port: isDev
        ? getValue('DB_PORT_DEV', 5432)
        : getValue<number>('DB_PORT', 5432),

      username: isDev
        ? getValue('DB_USERNAME_DEV', '')
        : getValue('DB_USERNAME', ''),

      password: isDev
        ? getValue('DB_PASSWORD_DEV', '')
        : getValue('DB_PASSWORD', ''),

      database: isDev ? getValue('DB_NAME_DEV', '') : getValue('DB_NAME', ''),

      synchronize: false,
      logging: false,
      entities: [__dirname + '/../../modules/**/entity/*.entity{.ts,.js}'],
    };
  },
};
