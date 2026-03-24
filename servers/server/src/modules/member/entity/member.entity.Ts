import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

type MemberRole = 'admin' | 'member';

@Entity('members')
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
