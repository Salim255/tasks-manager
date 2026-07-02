import { Project } from 'src/modules/project/entity/project.entity';
import { User } from 'src/modules/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

type MemberRole = 'admin' | 'member';

@Entity('members')
@Unique(['userId', 'projectId'])
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Project, project => project.members)
  project!: Project;

  @Column({ type: 'uuid' })
  projectId!: string; // FK → projects.id

  @Column({ type: 'uuid' })
  userId!: string; // FK → profiles.id

  @ManyToOne(() => User, (user) => user.projectMembers)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column({ type: 'varchar', length: 20 })
  role!: MemberRole; // 'admin' | 'member'

  @CreateDateColumn()
  createdAt!: Date;
}
