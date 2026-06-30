import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import type { SprintStatus } from '../dto/sprint.dto';
import { Project } from 'src/modules/project/entity/project.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { Task } from 'src/modules/task/entity/task.entity';

@Entity('sprints')
export class Sprint {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ type: 'varchar', default: 'planned' })
  status!: SprintStatus;

  @Column({ type: 'timestamptz', nullable: true })
  startDate?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  endDate?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  completeDate?: Date;

  @Column()
  projectId!: string;

  @Column({ nullable: true })
  goal?: string;

  @ManyToOne(() => Project, project => project.sprints, { onDelete: 'CASCADE' })
  project!: Project;

  @ManyToOne(() => User, user=> user.reporterSprints, { onDelete: 'CASCADE' } )
  reporter!: User;
  
  @OneToMany(() => Task, task => task.sprint)
  tasks!: Task[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
