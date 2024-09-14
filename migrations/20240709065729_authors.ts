import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    return knex.schema.createTable("author", (table) => {

        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("bio");
        table.date("dob").notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("author");
}

