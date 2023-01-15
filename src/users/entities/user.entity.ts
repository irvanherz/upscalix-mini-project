import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserConfig } from './user-config.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;
  @Column({ type: 'varchar', length: 255, nullable: true })
  firstName: string;
  @Column({ type: 'varchar', length: 255, nullable: true })
  lastName: string;
  @Column({ type: 'date', nullable: true })
  dob: Date;
  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => UserConfig, (config) => config.user)
  config: UserConfig;
}
