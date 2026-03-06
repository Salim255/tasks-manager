import { Inject, Injectable } from '@nestjs/common';
import { SPRINT_REPOSITORY } from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { Sprint } from '../entity/sprint.entity';

@Injectable()
export class SprintService {
  constructor(@Inject(SPRINT_REPOSITORY) sprintRepo: Repository<Sprint>) {}
}
