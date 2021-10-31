import { Account } from '../../models/Account'
import { parseUser } from '../../utils/dbParseUser'
import { Connection, RowDataPacket } from 'mysql2/promise'

class BaseDatabaseHandler {
  private baseDbConnection: Connection
  
  constructor(dbConnection: Connection) {
    this.baseDbConnection = dbConnection
  }

  async getUserById(user_id: string) {
    let [ data ]  = await this.baseDbConnection.query(
      `SELECT * FROM users where user_id = ?`, [user_id]
    ) as RowDataPacket[]

    return parseUser(data)
  }

  async getUserByEmail(email: string) {
    let [ data ]  = await this.baseDbConnection.query(
      `SELECT * FROM users where email = ?`, [email]
    ) as RowDataPacket[]

    return parseUser(data)
  }

  async getAccountsByUser(user_id: string) {
    let [ data ]  = await this.baseDbConnection.query(
      `SELECT * FROM accounts where user_id = ?`, [user_id]
    ) as RowDataPacket[]

    if (data.length === 0) return undefined

    const accounts: Array<Account> = []

    data.forEach((account: Account) => {
      accounts.push(new Account(account))
    })

    return accounts
  }
}

export default BaseDatabaseHandler