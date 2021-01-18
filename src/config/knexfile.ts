import * as path from 'path';
import Knex from 'knex';

const database = {
  client: 'pg',
  connection: process.env.DB_URL,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.join(__dirname, '/../migrations'),
  },
  timezone: 'UTC',
} as Knex.Config;

export = database;
