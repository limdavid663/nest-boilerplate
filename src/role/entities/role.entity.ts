import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { BaseEntity } from '../../database/base.entity';
import { Permission } from '../../permission/entities/permission.entity';

@Entity('roles')
export class Role extends BaseEntity<Role> {
  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable({
    name: 'roles_permissions',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: Permission[];
}
