import { User } from '../../models/User'
import { Connection, ResultSetHeader } from 'mysql2/promise'

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
        error: err
      }
    }

    return {
      success: true,
      createdUserId: createdUserId
    }
  }

  async getUserById(user_id: number) {
    let [ user ]  = await this.dbConnection.query(
      `SELECT * FROM users where user_id = ?`, [user_id]
    )

    console.log(user)
  }
}

export default UserDatabaseHandler