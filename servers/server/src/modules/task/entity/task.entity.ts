import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import type { TaskPriority, TaskStatus, TaskType } from '../dto/task.dto';
import { Project } from 'src/modules/project/entity/project.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'varchar' })
  taskType: TaskType;

  @Column({ type: 'varchar' })
  status: TaskStatus;

  @Column({ type: 'varchar' })
  priority: TaskPriority;

  @Column({ nullable: true })
  ownerId?: string;

  @Column({ nullable: true })
  assigneeId?: string;

  @Column({ nullable: true })
  sprintId?: string;

  @Column()
  projectId: string;

  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  project: Project;

  @Column({ type: 'timestamptz', nullable: true })
  dueAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
