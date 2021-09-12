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
      ) as ResultSetHeader[]

      createdUserId = data.insertId
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

  async updateUser(user: User) {    
    try {
      await this.dbConnection.query(
        `UPDATE users SET first_name = ?, last_name = ?, email = ?, user_password = ? WHERE user_id = ?`, 
        [user.first_name, user.last_name, user.email, user.user_password, user.user_id]
      )
    } catch (err) {
      return {
        success: false,
        error: err as QueryError
      }
    }

    return {
      success: true,
      message: `User updated`
    }
  }

  async deleteUser(user_id: string) {    
    try {
      await this.dbConnection.query(
        `DELETE FROM users WHERE user_id = ?`, 
        [user_id]
      )
    } catch (err) {
      return {
        success: false,
        error: err as QueryError
      }
    }

    return {
      success: true,
      message: `User deleted`
    }
  }

  async getUserByEmail(email: string) {
    let [ data ]  = await this.dbConnection.query(
      `SELECT * FROM users where email = ?`, [email]
    ) as RowDataPacket[]

    return this.parseUser(data)
  }

  async getUserById(user_id: string) {
    let [ data ]  = await this.dbConnection.query(
      `SELECT * FROM users where user_id = ?`, [user_id]
    ) as RowDataPacket[]

    return this.parseUser(data)
  }

  parseUser(data: RowDataPacket) {
    if (data.length === 0) {
      return undefined
    }

    const userData = data[0] as IUser
    const user = new User(userData)

    return user
  }
}

export default UserDatabaseHandler