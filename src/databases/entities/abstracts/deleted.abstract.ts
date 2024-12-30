import { Expose } from 'class-transformer';
import { Column } from 'typeorm';

export default abstract class DeletedEntity {
  @Expose()
  @Column({
    type: 'tinyint',
    name: 'deleted',
    default: 0,
  })
  deleted: number;

  @Expose()
  @Column({
    type: 'varchar',
    name: 'deleted_by',
    nullable: true,
    default: 'system',
    length: 20,
  })
  deleted_by: string;

  @Expose()
  @Column({
    type: 'timestamp',
    name: 'deleted_at',
    nullable: true,
    default: Date.now(),
  })
  deleted_at: Date;
}
