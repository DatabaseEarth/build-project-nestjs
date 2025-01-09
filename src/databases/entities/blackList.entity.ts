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

@Entity('black_lists')
export class BlackListEntity extends CreatedUpdatedEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'token', type: 'varchar', length: 255, nullable: false })
  token: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: false })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  @Exclude()
  user: UserEntity;
}
