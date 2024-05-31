import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import RoleSeeder from './role.seeder';
import UserSeeder from './user.seeder';
import PermissionSeeder from './permission.seeder';

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const permissionSeeder = new PermissionSeeder();
    await permissionSeeder.run(dataSource, factoryManager);

    const roleSeeder = new RoleSeeder();
    await roleSeeder.run(dataSource, factoryManager);

    const userSeeder = new UserSeeder();
    await userSeeder.run(dataSource, factoryManager);
  }
}
