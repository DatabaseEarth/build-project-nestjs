import { Exclude, Expose } from 'class-transformer';
import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../user.entity';

export default abstract class CreatedEntity {
  @Expose()
  @Column({
    type: 'uuid',
    name: 'created_by',
    nullable: true,
  })
  created_by: string;

  @Expose()
  @Column({
    type: 'timestamp',
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by' }) // Cột trong bảng sẽ chứa ID của UserEntity
  @Exclude()
  user_create: UserEntity;
}
