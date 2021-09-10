import { Connection } from 'mysql2/promise'

class TransactionDatabaseHandler {
  private dbConnection: Connection
  
  constructor(dbConnection: Connection) {
    this.dbConnection = dbConnection
  }

  async createTransaction() { 
    let [ data ]  = await this.dbConnection.query(
      `SELECT * FROM transactions`
    )

    console.log(data)
  }
}

export default TransactionDatabaseHandler