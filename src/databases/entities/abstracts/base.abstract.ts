import { Expose } from 'class-transformer';
import { Column } from 'typeorm';

export abstract class CreatedUpdateEntity {
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
    type: 'datetime',
    name: 'updated_at',
    nullable: true,
    default: Date.now(),
  })
  updated_at: Date;
}

export abstract class CreatedUpdateDeletedEntity {
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
    type: 'datetime',
    name: 'updated_at',
    nullable: true,
    default: Date.now(),
  })
  updated_at: Date;

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
    type: 'datetime',
    name: 'deleted_at',
    nullable: true,
    default: Date.now(),
  })
  deleted_at: Date;
}
