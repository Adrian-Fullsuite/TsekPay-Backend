/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("payslip", (table) => {
    table.uuid("id").defaultTo(knex.fn.uuid()).primary();
    table.uuid("company_id").references("id").inTable("company").notNullable();
    table.uuid("employee_id").notNullable();
    table.string("first_name").notNullable();
    table.string("middle_name").nullable();
    table.string("last_name").notNullable();
    table.string("email").unique();
    table.date("start_date").notNullable();
    table.date("end_date").notNullable();
    table.json("payables").notNullable();
    table.decimal("total_earnings", 2).notNullable();
    table.decimal("total_deductions", 2).notNullable();
    table.decimal("net_salary", 2).notNullable();
    table.dateTime("date_of_payout").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("payslip");
};
