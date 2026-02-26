import { DataSource } from 'typeorm';
import { Migrations } from './migrations';
import { Schemas } from './schemas';

import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: +configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [...Schemas],
  migrations: [...Migrations],
  logging: true,
});

export default AppDataSource;
