import { Request, Response } from 'express'
import TransactionDatabaseHandler from '../database/databaseHandlers/TransactionDatabaseHandler'
import { Transaction } from '../models/Transaction'

class TransactionController {
  private dbHandler: TransactionDatabaseHandler
  private validateTransaction: (transaction: Transaction) => Array<string>

  constructor(dbHandler: TransactionDatabaseHandler, validateTransaction: (transaction: Transaction) => Array<string>) {
    this.dbHandler = dbHandler
    this.validateTransaction = validateTransaction
  }

  async createTransaction(req: Request, res: Response) {
    const transaction = new Transaction(req.body)

    this.validateTransaction(transaction)
    this.dbHandler.createTransaction()

    res.json({
      success: true,
      message: `Transaction created`
    })
  }
}

export default TransactionController