import { ConfigService } from '@nestjs/config';
import { DB_OPTIONS } from 'src/common/constants/constants';
import { getEnvVar } from 'src/common/utils/utils';
import { DataSourceOptions } from 'typeorm';

export const DatabaseOptionsProvider = {
  provide: DB_OPTIONS,
  inject: [ConfigService],
  useFactory: (config: ConfigService): DataSourceOptions => {
    return {
      type: 'postgres',

      host: getEnvVar<string>('DB_HOST', '', config),
       
      port: getEnvVar<number>('DB_PORT', 5432, config),

      username: getEnvVar<string>('DB_USERNAME', '', config),

      password: getEnvVar<string>('DB_PASSWORD', '', config),

      database: getEnvVar<string>('DB_NAME', '', config),
      synchronize: true,
      logging: false,
      entities: [__dirname + '/../../modules/**/entity/*.entity{.ts,.js}'],
    };
  },
};
