import { User } from 'src/modules/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  userId!: string;

  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn()
  user!: User;

  @Column({ nullable: false })
  firstName!: string;

  @Column({ nullable: false })
  lastName!: string;

  @Column({ nullable: true, default: null })
  avatarUrl!: string;

  @Column({ nullable: true, default: null })
  bio!: string;

  @Column({ nullable: true, default: null })
  timezone!: string;

  @Column({ type: 'jsonb', default: {} })
  preferences!: Record<string, any>;
}
