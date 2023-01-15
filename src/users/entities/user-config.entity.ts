import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserConfig {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 10, nullable: true })
  timezone: string;
  @Column({ type: 'timestamp', nullable: true })
  lastBirthdayGreetingAt: Date;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToOne(() => User, (user) => user.config)
  @JoinColumn()
  user: User;
}
