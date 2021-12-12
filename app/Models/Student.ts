import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Enrollment from './Enrollment'
import Room from './Room'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public registration: string

  @column()
  public born: Date

  @hasMany(() => Room)
  public rooms: HasMany<typeof Room>

  @hasMany(() => Enrollment)
  public enrollments: HasMany<typeof Enrollment>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
