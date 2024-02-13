/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("company", (table) => {
    table.uuid("id").defaultTo(knex.fn.uuid()).primary();
    table.uuid("account_id").references("id").inTable("account").notNullable();
    table.string("name").notNullable();
    table.string("logo").notNullable();
    table.string("address").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("company");
};
