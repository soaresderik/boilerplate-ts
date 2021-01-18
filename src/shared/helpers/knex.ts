import * as Knex from 'knex';

export async function createTable(
  knex: Knex,
  tableName: string,
  tableBuilder: (table: Knex.CreateTableBuilder) => void,
) {
  await knex.schema.createTable(tableName, table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    tableBuilder(table);
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
    table.boolean('isDeleted').notNullable().defaultTo(false);
  });
}

export async function alterTable(
  knex: Knex,
  tableName: string,
  tableBuilder: (table: Knex.CreateTableBuilder) => void,
) {
  await knex.schema.alterTable(tableName, table => {
    tableBuilder(table);
  });
}

export async function dropTable(knex: Knex, tableName: string) {
  await knex.schema.dropTableIfExists(tableName);
}
