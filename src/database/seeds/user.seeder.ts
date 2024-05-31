import * as bcrypt from 'bcrypt';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Role } from '../../role/entities/role.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const roleRepository = dataSource.getRepository(Role);

    const password = await bcrypt.hash('122', 10);

    const userRole = await roleRepository.findOne({ where: { name: 'user' } });
    const adminRole = await roleRepository.findOne({
      where: { name: 'admin' },
    });

    // Seed admin
    const existingAdmin = await userRepository.findOne({
      where: { username: 'admin' },
    });
    if (!existingAdmin) {
      const admin = new User();
      admin.username = 'admin';
      admin.password = password;
      admin.roles = [adminRole];
      await userRepository.save(admin);
    }

    // Seed user
    const existingUser = await userRepository.findOne({
      where: { username: 'user' },
    });
    if (!existingUser) {
      const user = new User();
      user.username = 'user';
      user.password = password;
      user.roles = [userRole];
      await userRepository.save(user);
    }
  }
}
