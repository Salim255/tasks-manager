import { DATA_SOURCE } from 'src/common/constants/constants';
import { DataSource } from 'typeorm';
import { Member } from '../entity/member.entity';

export const ProjectMemberRepository = {
  provide: '',
  inject: [DATA_SOURCE],
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Member),
};
