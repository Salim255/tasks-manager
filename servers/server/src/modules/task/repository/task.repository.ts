import { DATA_SOURCE, TASK_REPOSITORY } from 'src/common/constants/constants';
import { DataSource } from 'typeorm';
import { Task } from '../entity/task.entity';

export const TaskRepository = {
  provide: TASK_REPOSITORY,
  inject: [DATA_SOURCE],
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
};
