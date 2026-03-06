import {
  DATA_SOURCE,
  PROFILE_REPOSITORY,
} from 'src/common/constants/constants';
import { DataSource } from 'typeorm';
import { Profile } from '../entity/profile.entity';

export const ProfileRepository = {
  provide: PROFILE_REPOSITORY,
  inject: [DATA_SOURCE],
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Profile),
};
