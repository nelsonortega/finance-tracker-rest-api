import { Request, Response } from 'express'
import { Transaction } from '../models/Transaction'
import TransactionDatabaseHandler from '../database/databaseHandlers/TransactionDatabaseHandler'

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
    this.dbHandler.createTransaction(transaction)

    res.json({
      success: true,
      message: `Transaction created`
    })
  }

  getTransactionsByAccount(_req: Request, res: Response) {
    res.json({
      success: false,
      message: `Not yet implemented`
    })
  }
}

export default TransactionController