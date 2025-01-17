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

@Entity('access_tokens')
export class AccessTokenEntity extends CreatedUpdatedEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'token', type: 'text', nullable: false })
  token: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: false })
  userId: string;

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
  @JoinColumn({ name: 'user_id' }) // Cột trong bảng sẽ chứa ID của UserEntity
  @Exclude()
  user: UserEntity;
}
