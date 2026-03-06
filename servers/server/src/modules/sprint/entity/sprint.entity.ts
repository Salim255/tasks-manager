import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export type SprintStatus = 'active' | 'completed' | 'planned' | 'upcoming';

@Entity('sprints')
export class Sprint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'varchar' })
  status: SprintStatus;

  @Column({ type: 'timestamptz', nullable: true })
  startDate?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  endDate?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  completeDate?: Date;

  @Column()
  projectId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
