import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Enrollments extends BaseSchema {
  protected tableName = 'enrollments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable().unique().primary()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table
        .string('student_id')
        .references('id')
        .inTable('students')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .string('room_id')
        .references('id')
        .inTable('rooms')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
