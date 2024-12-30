import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { CreatedUpdateEntity } from './abstracts';

@Entity('users')
@Unique(['email'])
export class UserEntity extends CreatedUpdateEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'email', type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ name: 'avatar', type: 'varchar', length: 255, nullable: true })
  avatar: string;

  @Column({ name: 'address', type: 'varchar', length: 255, nullable: true })
  address: string;

  @Column({ name: 'mobile', type: 'varchar', length: 15, nullable: true })
  mobile: string;

  @Column({ name: 'role', type: 'varchar', length: 50, nullable: true })
  role: string;

  @Column({ name: 'birthday', type: 'date', nullable: true })
  birthday: string;

  @Column({ name: 'firebase', type: 'varchar', length: 255, nullable: true })
  firebase: string;

  @Column({ name: 'status', type: 'varchar', length: 50, nullable: true })
  status: string;
}
