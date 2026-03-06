import { DATA_SOURCE, USER_REPOSITORY } from 'src/common/constants/constants';
import { DataSource } from 'typeorm';
import { User } from '../entity/user.entity';

export const UserRepository = {
  provide: USER_REPOSITORY,
  inject: [DATA_SOURCE],
  useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
};
