import { Exclude, Expose } from 'class-transformer';
import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../user.entity';

export default abstract class UpdatedEntity {
  @Expose()
  @Column({
    type: 'uuid',
    name: 'updated_by',
    nullable: true,
  })
  updated_by: string;

  @Expose()
  @Column({
    type: 'timestamp',
    name: 'updated_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'updated_by' }) // Cột trong bảng sẽ chứa ID của UserEntity
  @Exclude()
  user_update: UserEntity;
}
