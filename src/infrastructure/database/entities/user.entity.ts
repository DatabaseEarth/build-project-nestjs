import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from '@/common/abstracts';

@Entity('users')
@Unique(['email', 'phone'])
export class UserEntity extends BaseEntity {
  @Column({ name: 'email', type: 'varchar', length: 100, nullable: false })
  email: string;

  @Column({ name: 'phone', type: 'varchar', length: 20, nullable: false })
  phone: string;

  @Column({ name: 'password', type: 'varchar', length: 500, nullable: false })
  password: string;

  @Column({ name: 'full_name', type: 'varchar', length: 255, nullable: false })
  fullName: string;
}
