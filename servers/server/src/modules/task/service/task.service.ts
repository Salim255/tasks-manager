import { Inject, Injectable } from '@nestjs/common';
import { TASK_REPOSITORY } from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { Task } from '../entity/task.entity';

@Injectable()
export class TaskService {
  constructor(@Inject(TASK_REPOSITORY) taskRepo: Repository<Task>) {}
}
