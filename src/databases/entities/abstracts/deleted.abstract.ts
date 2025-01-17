import { Exclude, Expose } from 'class-transformer';
import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../user.entity';

export default abstract class DeletedEntity {
  @Expose()
  @Column({
    type: 'smallint',
    name: 'deleted',
    default: 0,
  })
  deleted: number;

  @Expose()
  @Column({
    type: 'uuid',
    name: 'deleted_by',
    nullable: true,
  })
  deleted_by: string;

  @Expose()
  @Column({
    type: 'timestamp',
    name: 'deleted_at',
    nullable: true,
  })
  deleted_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'deleted_by' }) // Cột trong bảng sẽ chứa ID của UserEntity
  @Exclude()
  user_delete: UserEntity;
}
