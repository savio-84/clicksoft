import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Student from './Student'
import Room from './Room'

export default class Enrollment extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @belongsTo(() => Student)
  public student: BelongsTo<typeof Student>

  @column()
  public student_id: string;

  @belongsTo(() => Room)
  public room: BelongsTo<typeof Room>

  @column()
  public room_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
