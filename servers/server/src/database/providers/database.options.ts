import { ConfigService } from '@nestjs/config';
import { DB_OPTIONS } from 'src/common/constants/constants';
import { DataSourceOptions } from 'typeorm';

export const DatabaseOptionsProvider = {
  provide: DB_OPTIONS,
  inject: [ConfigService],
  useFactory: (config: ConfigService): DataSourceOptions => {
    const getValue = <T>(key: string, fb: T): T => config.get<T>(key) ?? fb;

    return {
      type: 'postgres',

      host: getValue<string>('DB_HOST', ''),

      port: getValue<number>('DB_PORT', 5432),

      username: getValue('DB_USERNAME', ''),

      password: getValue('DB_PASSWORD', ''),

      database: getValue('DB_NAME', ''),

      synchronize: false,
      logging: false,
      entities: [__dirname + '/../../modules/**/entity/*.entity{.ts,.js}'],
    };
  },
};
