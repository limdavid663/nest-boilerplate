import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../database/base.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity<User> {
  @Column()
  username: string;

  @Column()
  password: string;
}
