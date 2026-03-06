import { DATA_SOURCE, SPRINT_REPOSITORY } from 'src/common/constants/constants';
import { DataSource } from 'typeorm';
import { Sprint } from '../entity/sprint.entity';

export const SprintRepository = {
  provide: SPRINT_REPOSITORY,
  inject: [DATA_SOURCE],
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Sprint),
};
