import { DB_OPTIONS } from 'src/common/constants/constants';
import { DataSource, DataSourceOptions } from 'typeorm';

export const DatabaseInitProvider = {
  provide: 'DATA_SOURCE',
  inject: [DB_OPTIONS],
  useFactory: async (options: DataSourceOptions) => {
    try {
      const dataSource = new DataSource({
        ...options,
      });

      return await dataSource.initialize();
    } catch (error) {
      console.log(error, options);
    }
  },
};
