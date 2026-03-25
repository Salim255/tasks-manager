import { Inject, Logger } from '@nestjs/common';
import { CreateMemberDto } from '../dto/member.dto';
import { Member } from '../entity/member.entity';
import { MEMBER_REPOSITORY } from 'src/common/constants/constants';
import { Repository } from 'typeorm';

export class MemberService {
  private logger = new Logger(MemberService.name);

  constructor(
    @Inject(MEMBER_REPOSITORY) private memberRepo: Repository<Member>,
  ) {}

  async create(
    payload: Omit<CreateMemberDto, 'email'> & { userId: string },
  ): Promise<Member> {
    try {
      const query = `
        INSERT INTO members ("projectId", "userId", role)
        VALUES ($1, $2, $3)
        RETURNING *;`;
      const values = [payload.projectId, payload.userId, payload.role];
      const member: Member[] = await this.memberRepo.query(query, values);
      return member[0];
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
