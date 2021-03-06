import { Account } from '../../models/Account'
import BaseDatabaseHandler from './BaseDatabaseHandler'
import { Connection, QueryError, ResultSetHeader, RowDataPacket } from 'mysql2/promise'

class AccountDatabaseHandler extends BaseDatabaseHandler {
  private dbConnection: Connection
  
  constructor(dbConnection: Connection) {
    super(dbConnection)
    this.dbConnection = dbConnection
  }

  async createAccount(account: Account) { 
    let createdAccountId

    try {
      let [ data ]  = await this.dbConnection.query(
        `INSERT INTO accounts (account_name, currency, user_id) VALUES (?, ?, ?)`, 
        [account.account_name, account.currency, account.user_id]
      ) as ResultSetHeader[]

      createdAccountId = data.insertId
    } catch (err) {
      return { error: err as QueryError }
    }

    return { createdAccountId }
  }

  async updateAccount(account: Account) {    
    try {
      await this.dbConnection.query(
        `UPDATE accounts SET account_name = ?, currency = ? WHERE account_id = ?`, 
        [account.account_name, account.currency, account.account_id]
      )
    } catch (err) {
      return { error: err as QueryError }
    }

    return { message: `Account updated` }
  }

  async deleteAccount(account_id: string) {    
    try {
      await this.dbConnection.query(
        `DELETE FROM accounts WHERE account_id = ?`, 
        [account_id]
      )
    } catch (err) {
      return { error: err as QueryError }
    }

    return { message: `Account deleted` }
  }

  async getAccountById(account_id: string) {
    let [ data ]  = await this.dbConnection.query(
      `SELECT * FROM accounts where account_id = ?`, [account_id]
    ) as RowDataPacket[]

    if (data.length === 0) return undefined

    const accountData = data[0] as Account
    const account = new Account(accountData)

    return account
  }
}

export default AccountDatabaseHandler