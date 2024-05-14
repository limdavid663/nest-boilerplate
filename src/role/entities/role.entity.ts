import { Column, Entity, ManyToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { BaseEntity } from '../../database/base.entity';

@Entity('roles')
export class Role extends BaseEntity<Role> {
  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
