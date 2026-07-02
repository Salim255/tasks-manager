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

  @Column({ type: 'timestamptz', nullable: true, default: null })
  startDate!: Date;

  @Column({ type: 'timestamptz', nullable: true, default: null })
  endDate!: Date;

  @Column({ type: 'timestamptz', nullable: true, default: null })
  completeDate!: Date;

  @Column({type: "uuid"})
  projectId!: string;

  @Column({ nullable: true, default: null  })
  goal!: string;

  @ManyToOne(() => Project, project => project.sprints, { onDelete: 'CASCADE' })
  project!: Project;

  @Column({type: "uuid"})
  creatorId!: string;

  @ManyToOne(() => User, user=> user.createdSprints, { onDelete: 'CASCADE' } )
  creator!: User;

  @OneToMany(() => Task, task => task.sprint)
  tasks!: Task[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
