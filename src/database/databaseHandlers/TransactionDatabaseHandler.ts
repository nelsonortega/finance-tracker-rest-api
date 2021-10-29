import { Account } from '../../models/Account'
import { ITransaction, Transaction } from '../../models/Transaction'
import { Connection, QueryError, ResultSetHeader, RowDataPacket } from 'mysql2/promise'

class TransactionDatabaseHandler {
  private dbConnection: Connection
  
  constructor(dbConnection: Connection) {
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

  async getAccountsByUser(user_id: string) {
    let [ data ]  = await this.dbConnection.query(
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

export default TransactionDatabaseHandler