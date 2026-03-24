import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('project_members')
export class ProjectMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  projectId: string; // FK → projects.id

  @Column({ type: 'uuid' })
  userId: string; // FK → profiles.id

  @Column({
    type: 'varchar',
    length: 20,
  })
  role: ProjectMemberRole; // 'admin' | 'member'

  @CreateDateColumn()
  createdAt: Date;
}
