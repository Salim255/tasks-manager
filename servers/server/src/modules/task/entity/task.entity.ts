import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  OneToOne,
} from 'typeorm';
import type { TaskPriority, TaskStatus, TaskType } from '../dto/task.dto';
import { Project } from 'src/modules/project/entity/project.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { Sprint } from 'src/modules/sprint/entity/sprint.entity';

@Entity('tasks')
@Index(['projectId'])
@Index(['assigneeId'])
@Index(['sprintId'])
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'varchar', default: 'task' })
  taskType!: TaskType;

  @Column({ type: 'varchar', default: 'todo' })
  status!: TaskStatus;

  @Column({ type: 'varchar', nullable: true })
  priority?: TaskPriority;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'reporterId' })
  reporter!: User;

  @Column({ type: "uuid",  nullable: false })
  reporterId!: string;

  @Column()
  taskNumber!: number;

  @ManyToOne(() => User, {
    nullable: true,
  })
  @JoinColumn({ name: 'assigneeId' })
  assignee?: User;

  @Column({ type: "uuid", nullable: true })
  assigneeId?: string;


  @Column({ type: 'uuid', nullable: true })
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

  @Column({ type: 'int', nullable: true})
  pointEstimate?: number;

  @Column({ type: 'timestamptz', nullable: true })
  dueAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
