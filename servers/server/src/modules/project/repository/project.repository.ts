import {
  DATA_SOURCE,
  PROJECT_REPOSITORY,
} from 'src/common/constants/constants';
import { DataSource } from 'typeorm';
import { Project } from '../entity/project.entity';

export const ProjectRepository = {
  provide: PROJECT_REPOSITORY,
  inject: [DATA_SOURCE],
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Project),
};
