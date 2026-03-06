import { Inject, Injectable } from '@nestjs/common';
import { PROJECT_REPOSITORY } from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { Project } from '../entity/project.entity';

@Injectable()
export class ProjectService {
  constructor(@Inject(PROJECT_REPOSITORY) projectRepo: Repository<Project>) {
    //console.log(this.projectRepo())
  }
}
