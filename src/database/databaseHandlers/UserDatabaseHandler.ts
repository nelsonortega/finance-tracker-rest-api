import { IUser, User } from '../../models/User'
import { Connection, QueryError, ResultSetHeader, RowDataPacket } from 'mysql2/promise'

class UserDatabaseHandler {
  private dbConnection: Connection
  
  constructor(dbConnection: Connection) {
    this.dbConnection = dbConnection
  }

  async createUser(user: User) {
    let createdUserId: number
    
    try {
      let [ data ]  = await this.dbConnection.query(
        `INSERT INTO users (first_name, last_name, email, user_password) VALUES (?, ?, ?, ?)`, 
        [user.first_name, user.last_name, user.email, user.user_password]
      )

      const createdUser = data as ResultSetHeader

      createdUserId = createdUser.insertId
    } catch (err) {
      return {
        success: false,
        error: err as QueryError
      }
    }

    return {
      success: true,
      createdUserId: createdUserId
    }
  }

  async getUserByEmail(email: string) {
    let [ data ]  = await this.dbConnection.query(
      `SELECT * FROM users where email = ?`, [email]
    ) as RowDataPacket[]

    if (data.length === 0) {
      return undefined
    }

    const userData = data[0] as IUser

    const user = new User(userData)

    return user
  }
}

export default UserDatabaseHandler