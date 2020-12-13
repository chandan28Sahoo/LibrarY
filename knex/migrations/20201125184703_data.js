exports.up = async function(knex) {
    await knex.schema.createTable("teachers", (table) => {
        table.increments("id").primary();
        table.string("name", 255).notNullable();
        table.string("email", 255).notNullable();
        table.string("phone_no", 250).notNullable();
        table.string("password", 255).notNullable();
        table.string("user_type");
    });
    await knex.schema.createTable("students", (table) => {
        table.increments("id").primary();
        table.string("name", 255).notNullable();
        table.string("class", 25).notNullable();
        table.string("phone_no", 250).notNullable();
        table.string("email", 255).notNullable();
        table.string("password", 255).notNullable();
    });
    await knex.schema.createTable("books", (table) => {
        table.increments("id").primary();
        table.string("name", 255).notNullable();
        table.string("Author", 255).notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
    await knex.schema.createTable("librarian", (table) => {
        table.increments("id").primary();
        table.string("name", 255).notNullable();
        table.integer("teacher_id", 255).references("id").inTable("teachers");
    });
    await knex.schema.createTable("library", (table) => {
        table.increments("id").primary();
        table.string("student_name", 255).notNullable();
        table.string("book_name", 255).notNullable();
        table.integer("book_id", 250);
        table.integer("student_id", 255).references("students.id");
        table.integer("librarian_id", 255).references("librarian.id");
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
    return true;
};

exports.down = async function(knex) {
    await knex.schema.dropTable("library");
    await knex.schema.dropTable("librarian");
    await knex.schema.dropTable("books");
    await knex.schema.dropTable("students");
    await knex.schema.dropTable("teachers");
    return true;
};