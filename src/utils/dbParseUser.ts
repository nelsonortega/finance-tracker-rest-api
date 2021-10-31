import { IUser, User } from '../models/User'
import { RowDataPacket } from 'mysql2/promise'

export function parseUser(data: RowDataPacket) {
  if (data.length === 0) {
    return undefined
  }

  const userData = data[0] as IUser
  const user = new User(userData)

  return user
}