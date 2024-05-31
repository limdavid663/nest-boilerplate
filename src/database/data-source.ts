import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

config();
const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.getOrThrow('DB_HOST'),
  port: configService.getOrThrow('DB_PORT'),
  database: configService.getOrThrow('DB_NAME'),
  username: configService.getOrThrow('DB_USERNAME'),
  password: configService.getOrThrow('DB_PASSWORD'),
  synchronize: configService.getOrThrow('DB_SYNCHRONIZE') === 'true',
  logging: configService.getOrThrow('DB_LOGGING') === 'true',
  entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
});
