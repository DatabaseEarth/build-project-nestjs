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

  @Column({ name: 'token', type: 'text', nullable: false })
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

  @Column({
    name: 'expires_at',
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  expiresAt: Date;

  @Column({
    name: 'issued_at',
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  issuedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  @Exclude()
  user: UserEntity;
}
