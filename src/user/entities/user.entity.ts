import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../database/base.entity';

@Entity()
export class User extends BaseEntity<User> {
  @Column()
  username: string;

  @Column()
  password: string;
}
