import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { CreatedUpdatedDeletedEntity } from './abstracts';
import { RefreshTokenEntity } from './refreshToken.entity';
import { UserStatus } from '@common';

@Entity('users')
@Unique(['email'])
export class UserEntity extends CreatedUpdatedDeletedEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'fullname', type: 'varchar', length: 255, nullable: false })
  fullname: string;

  @Column({ name: 'email', type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({
    name: 'avatar',
    type: 'varchar',
    length: 255,
    default: 'avatar.png',
    nullable: true,
  })
  avatar: string;

  @Column({ name: 'address', type: 'varchar', length: 255, nullable: true })
  address: string;

  @Column({ name: 'mobile', type: 'varchar', length: 15, nullable: true })
  mobile: string;

  @Column({ name: 'role', type: 'varchar', length: 50, nullable: true })
  role: string;

  @Column({ name: 'birthday', type: 'date', nullable: true })
  birthday: string;

  @Column({ name: 'firebase', type: 'varchar', length: 255, nullable: true })
  firebase: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;
}
