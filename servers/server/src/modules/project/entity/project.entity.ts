import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  Unique,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { ProjectStatus } from '../dto/project.dto';
import { User } from 'src/modules/user/entity/user.entity';
import { Task } from 'src/modules/task/entity/task.entity';
import { Sprint } from 'src/modules/sprint/entity/sprint.entity';
import { Member } from 'src/modules/member/entity/member.entity';

@Entity('projects')
@Unique(["ownerId", "name"])
@Unique(["ownerId", "key"])
@Index(['ownerId'])
@Index(['status'])
export class Project {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 120,
  })
  name!: string;

  @Column({ type: 'varchar', default: null, nullable: true })
  demoClientId!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'varchar',
    length: 10,
  })
  key!: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.ACTIVE,
  })
  status!: ProjectStatus;

  @Column({ type: 'int', default: 1 })
  nextTaskNumber!: number;

  @Column({ type: 'int', default: 1 })
  nextSprintNumber!: number;

  @Column({
    type: 'uuid',
  })
  ownerId!: string;

  @ManyToOne(() => User , user => user.ownedProjects, { onDelete: "CASCADE" })
  owner!: User

  // Project side (one → many)
  @OneToMany(() => Task, task => task.project)
  tasks!: Task[];

  @OneToMany(() => Sprint, sprint => sprint.project)
  sprints!: Sprint[];

  @OneToMany(() => Member, member => member.project)
  members!: Member[];
  
  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt!: Date;

}