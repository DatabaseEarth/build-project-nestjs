import { Expose } from 'class-transformer';
import { Column } from 'typeorm';

export default abstract class CreatedEntity {
  @Expose()
  @Column({
    type: 'varchar',
    name: 'created_by',
    nullable: true,
    default: 'system',
    length: 20,
  })
  created_by: string;

  @Expose()
  @Column({
    type: 'datetime',
    name: 'created_at',
    nullable: true,
    default: Date.now(),
  })
  created_at: Date;
}
