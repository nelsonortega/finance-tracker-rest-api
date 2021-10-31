import { User } from '../../models/User'
import BaseDatabaseHandler from './BaseDatabaseHandler'
import { Connection, QueryError, ResultSetHeader } from 'mysql2/promise'

class UserDatabaseHandler extends BaseDatabaseHandler {
  private dbConnection: Connection
  
  constructor(dbConnection: Connection) {
    super(dbConnection)
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
      return { error: err as QueryError }
    }

    return { createdUserId }
  }

  async updateUser(user: User) {    
    try {
      await this.dbConnection.query(
        `UPDATE users SET first_name = ?, last_name = ?, email = ?, user_password = ? WHERE user_id = ?`, 
        [user.first_name, user.last_name, user.email, user.user_password, user.user_id]
      )
    } catch (err) {
      return { error: err as QueryError }
    }

    return { message: `User updated` }
  }

  async deleteUser(user_id: string) {    
    try {
      await this.dbConnection.query(
        `DELETE FROM users WHERE user_id = ?`, 
        [user_id]
      )
    } catch (err) {
      return { error: err as QueryError }
    }

    return { message: `User deleted` }
  }
}

export default UserDatabaseHandler