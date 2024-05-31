import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Permission } from '../../permission/entities/permission.entity';

export default class PermissionSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const permissionRepository = dataSource.getRepository(Permission);

    const permissions = [
      { name: 'read_user' },
      { name: 'create_user' },
      { name: 'update_user' },
      { name: 'delete_user' },
    ];

    for (const permissionData of permissions) {
      const existingPermission = await permissionRepository.findOne({
        where: { name: permissionData.name },
      });

      if (!existingPermission) {
        const permission = new Permission(permissionData);
        await permissionRepository.save(permission);
      }
    }
  }
}
