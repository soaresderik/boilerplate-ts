import * as Knex from 'knex';
import { createTable, dropTable } from '../shared/helpers/knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

  await createTable(knex, 'users', table => {
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
  });

  await createTable(knex, 'todos', table => {
    table.string('description').notNullable();
    table.boolean('done').defaultTo(false);
    table.uuid('userId').references('id').inTable('users').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await dropTable(knex, 'todos');
  await dropTable(knex, 'users');
}
