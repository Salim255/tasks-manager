import { Logger } from '@nestjs/common';
import { DATA_SOURCE, DB_OPTIONS } from 'src/common/constants/constants';
import { DataSource, DataSourceOptions } from 'typeorm';

export const DatabaseInitProvider = {
  provide: DATA_SOURCE,
  inject: [DB_OPTIONS],
  useFactory: async (options: DataSourceOptions) => {
    const logger = new Logger('DataBaseInit');
    try {
      const dataSource = new DataSource({
        ...options,
      });
      await dataSource.initialize();
      logger.log('Database connected successfully... ✅✅');
      return dataSource;
    } catch (error) {
      logger.error('❌ Database connection failed...');
      logger.error(error);
      throw error;
    }
  },
};
