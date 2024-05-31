import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { Permission } from '../../permission/entities/permission.entity';

export default class RoleSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const roleRepository = dataSource.getRepository(Role);
    const permissionRepository = dataSource.getRepository(Permission);

    const roles = [
      {
        name: 'admin',
        permissions: ['read_user', 'create_user', 'update_user', 'delete_user'],
      },
      {
        name: 'user',
        permissions: ['read_user'],
      },
    ];

    for (const roleData of roles) {
      let role = await roleRepository.findOne({
        where: { name: roleData.name },
        relations: ['permissions'],
      });

      if (!role) {
        role = new Role({ name: roleData.name });
      }

      role.permissions = [];
      for (const permissionName of roleData.permissions) {
        const permission = await permissionRepository.findOne({
          where: { name: permissionName },
        });

        if (permission) {
          role.permissions.push(permission);
        }
      }

      await roleRepository.save(role);
    }
  }
}
