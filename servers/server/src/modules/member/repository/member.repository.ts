import { DATA_SOURCE, MEMBER_REPOSITORY } from 'src/common/constants/constants';
import { DataSource } from 'typeorm';
import { Member } from '../entity/member.entity';

export const MemberRepository = {
  provide: MEMBER_REPOSITORY,
  inject: [DATA_SOURCE],
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Member),
};
