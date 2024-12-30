import { Expose } from 'class-transformer';
import { Column } from 'typeorm';

export default abstract class UpdatedEntity {
  @Expose()
  @Column({
    type: 'varchar',
    name: 'updated_by',
    nullable: true,
    default: 'system',
    length: 20,
  })
  updated_by: string;

  @Expose()
  @Column({
    type: 'timestamp',
    name: 'updated_at',
    nullable: true,
    default: Date.now(),
  })
  updated_at: Date;
}
