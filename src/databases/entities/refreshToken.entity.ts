import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CreatedUpdatedEntity } from './abstracts';
import { Exclude } from 'class-transformer';
import { RefreshTokenStatus } from '@common';

@Entity('refresh_tokens')
export class RefreshTokenEntity extends CreatedUpdatedEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'token', type: 'varchar', length: 255, nullable: false })
  token: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: false })
  userId: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: RefreshTokenStatus,
    default: RefreshTokenStatus.ACTIVE,
  })
  status: RefreshTokenStatus;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  @Exclude()
  user: UserEntity;
}
