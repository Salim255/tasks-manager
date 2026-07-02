import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Project } from 'src/modules/project/entity/project.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { Sprint } from 'src/modules/sprint/entity/sprint.entity';

export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskType = 'task' | 'bug' | 'story';

@Entity('tasks')
@Index(['projectId'])
@Index(['assigneeId'])
@Index(['sprintId'])
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({ nullable: true, default: null })
  description!: string;

  @Column({ type: 'varchar', default: 'task' })
  taskType!: TaskType;

  @Column({ type: 'varchar', default: 'todo' })
  status!: TaskStatus;

  @Column({ type: 'varchar', default: 'medium' })
  priority?: TaskPriority;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'reporterId' })
  reporter!: User;

  @Column({ type: "uuid",  nullable: false })
  reporterId!: string;

  @Column({type: "int"})
  taskNumber!: number;

  @Column()
  issueKey!: string

  @ManyToOne(() => User, {
    nullable: true,
  })
  @JoinColumn({ name: 'assigneeId' })
  assignee?: User;

  @Column({ type: "uuid", nullable: true, default: null })
  assigneeId?: string;


  @Column({ type: 'uuid', nullable: true, default: null })
  sprintId?: string;

  @ManyToOne(() => Sprint, sprint => sprint.tasks, {
    onDelete: 'CASCADE',
  })
  sprint!: Sprint;

  // -----------------------
  // PROJECT (required)
  // -----------------------
  @Column({ type: 'uuid' })
  projectId!: string;

  // Task side (many → one)
  @ManyToOne(() => Project, project => project.tasks, {
    onDelete: 'CASCADE',
  })
  project!: Project;

  @Column({ type: 'int', nullable: true, default: null})
  pointEstimate?: number;

  @Column({ type: 'timestamptz', nullable: true , default: null})
  dueAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
