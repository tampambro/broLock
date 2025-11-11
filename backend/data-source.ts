import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import * as path from 'path';

var entitiesPath = path.join(__dirname, '..', '**', '*.entity*{.ts,.js}');
var migrationPath = path.join(__dirname, 'migration', '*{.ts,.js}');

config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/**/*.entity.js'],
  migrations: [__dirname + '/migration/*{.ts,.js}'],
  synchronize: false,
});
