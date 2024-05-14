import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../database/base.entity';
import { Role } from '../../role/entities/role.entity';

@Entity('permissions')
export class Permission extends BaseEntity<Permission> {
  @Column()
  name: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
