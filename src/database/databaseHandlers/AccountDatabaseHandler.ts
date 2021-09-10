import { Connection } from 'mysql2/promise'

class AccountDatabaseHandler {
  private dbConnection: Connection
  
  constructor(dbConnection: Connection) {
    this.dbConnection = dbConnection
  }

  async createAccount() { 
    let [ data ]  = await this.dbConnection.query(
      `SELECT * FROM accounts`
    )

    console.log(data)
  }
}

export default AccountDatabaseHandler