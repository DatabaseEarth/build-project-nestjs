import { Exclude, Expose } from 'class-transformer';
import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../user.entity';

export abstract class CreatedUpdatedEntity {
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
  @JoinColumn({ name: 'created_by' }) // Cột trong bảng sẽ chứa ID của UserEntity
  @Exclude()
  user_create: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'updated_by' }) // Cột trong bảng sẽ chứa ID của UserEntity
  @Exclude()
  user_update: UserEntity;
}

export abstract class CreatedUpdatedDeletedEntity {
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
  @JoinColumn({ name: 'created_by' }) // Cột trong bảng sẽ chứa ID của UserEntity
  @Exclude()
  user_create: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'updated_by' }) // Cột trong bảng sẽ chứa ID của UserEntity
  @Exclude()
  user_update: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'deleted_by' }) // Cột trong bảng sẽ chứa ID của UserEntity
  @Exclude()
  user_delete: UserEntity;
}
