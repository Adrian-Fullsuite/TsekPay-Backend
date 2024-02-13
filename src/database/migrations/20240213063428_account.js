/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("account", (table) => {
    table.uuid("id").defaultTo(knex.fn.uuid()).primary();
    table.string("email").unique().notNullable();
    table.string("first_name").notNullable();
    table.string("middle_name").nullable();
    table.string("last_name").notNullable();
    table.date("date_of_birth").notNullable();
    table.string("password").notNullable();
    table.string("account_type").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("account");
};
