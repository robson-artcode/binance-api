import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class AveragePriceHistoric extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public symbol:string;
  @column()
  public average_price:string;
  @column()
  public mins:number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  static query: any;
}
