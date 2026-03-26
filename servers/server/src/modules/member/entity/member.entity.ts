import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

type MemberRole = 'admin' | 'member';
@Entity('members')
@Unique(['userId', 'projectId']) 
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ type: 'uuid' })
  projectId: string; // FK → projects.id

  @Column({ type: 'uuid' })
  userId: string; // FK → profiles.id

  @Column({ type: 'varchar', length: 20 })
  role: MemberRole; // 'admin' | 'member'

  @CreateDateColumn()
  createdAt: Date;
}
