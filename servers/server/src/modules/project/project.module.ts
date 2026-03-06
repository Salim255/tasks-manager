import { Module } from '@nestjs/common';
import { ProjectService } from './service/project.service';
import { ProjectRepository } from './repository/project.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ProjectService, ProjectRepository],
})
export class ProjectModule {}
