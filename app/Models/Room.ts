import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Teacher from '../Models/Teacher'
import Enrollment from './Enrollment'
export default class Room extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public number: number

  @column()
  public capacity: number

  @column()
  public availability: boolean

  @hasMany(() => Enrollment)
  public enrollments: HasMany<typeof Enrollment>

  @belongsTo(() => Teacher)
  public owner: BelongsTo<typeof Teacher>

  @column()
  public owner_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
