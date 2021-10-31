import BaseDatabaseHandler from './BaseDatabaseHandler'
import { ITransaction, Transaction } from '../../models/Transaction'
import { Connection, QueryError, ResultSetHeader, RowDataPacket } from 'mysql2/promise'

class TransactionDatabaseHandler extends BaseDatabaseHandler {
  private dbConnection: Connection
  
  constructor(dbConnection: Connection) {
    super(dbConnection)
    this.dbConnection = dbConnection
  }

  async createTransaction(transaction: Transaction) { 
    let createdTransactionId

    try {
      let [ data ]  = await this.dbConnection.query(
        `INSERT INTO transactions (transaction_description, amount, is_income, account_id) VALUES (?, ?, ?, ?)`, 
        [transaction.transaction_description, transaction.amount, transaction.is_income, transaction.account_id]
      ) as ResultSetHeader[]

      createdTransactionId = data.insertId
    } catch (err) {
      return { error: err as QueryError }
    }

    return { createdTransactionId }
  }

  async getTransactionsByAccount(account_id: string) {
    let [ data ]  = await this.dbConnection.query(
      `SELECT * FROM transactions where account_id = ?`, [account_id]
    ) as RowDataPacket[]

    const transactionData = data as Array<ITransaction>
    const transactions: Array<Transaction> = []

    transactionData.forEach(transaction => {
      transactions.push(new Transaction(transaction))
    })

    return transactions
  }
}

export default TransactionDatabaseHandler