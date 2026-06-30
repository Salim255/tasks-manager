import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../dto/user.dto';
import { Profile } from 'src/modules/profile/entity/profile.entity';
import { Task } from 'src/modules/task/entity/task.entity';
import { Sprint } from 'src/modules/sprint/entity/sprint.entity';
import { Project } from 'src/modules/project/entity/project.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({type: 'boolean', default: false})
  isDemo!: boolean;

  @Index({ unique: true })
  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ default: false })
  emailVerified!: boolean;

  @Column({ type: 'text', nullable: true })
  refreshTokenHash?: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role!: UserRole;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile?: Profile;

  // User
  @OneToMany(() => Task, task => task.assignee)
  assignedTasks!: Task[];

  @OneToMany(() => Sprint,  sprint => sprint.creator)
  createdSprints!: Sprint[];

  @OneToMany(() => Task, task => task.reporter)
  reportedTasks!: Task[];

  @OneToMany(() => Project, project => project.owner)
  ownedProjects!: Project[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
