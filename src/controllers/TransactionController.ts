import { Request, Response } from 'express'
import { parseError } from '../utils/dbParseError'
import { Transaction } from '../models/Transaction'
import TransactionDatabaseHandler from '../database/databaseHandlers/TransactionDatabaseHandler'

class TransactionController {
  private dbHandler: TransactionDatabaseHandler
  private validate: (transaction: Transaction) => Array<string>

  constructor(dbHandler: TransactionDatabaseHandler, validate: (transaction: Transaction) => Array<string>) {
    this.dbHandler = dbHandler
    this.validate = validate
  }

  async createTransaction(req: Request, res: Response) {
    const { user_id } = req.params
    const transaction = new Transaction(req.body)
    let userAccountsIds: Array<number> = []

    const invalidTransaction = this.validateTransaction(transaction)
    if (invalidTransaction) return res.json(invalidTransaction)

    const userAccounts = await this.dbHandler.getAccountsByUser(user_id)

    if (userAccounts) {
      userAccountsIds = userAccounts.map(account => account.account_id)
      
      if (!userAccountsIds.includes(transaction.account_id)) {
        return res.json({
          success: false,
          error: `Account doesn't belong to the user`
        })
      }
    }

    const dbResponse = await this.dbHandler.createTransaction(transaction)

    if (dbResponse.error) {
      return res.json({
        success: false,
        error: parseError(dbResponse.error)
      })      
    }

    res.json({
      success: true,
      message: `Transaction created with Id ${dbResponse.createdTransactionId}`
    })
  }

  async getTransactionsByAccount(req: Request, res: Response) {
    const { user_id, id } = req.params

    let userAccountsIds: Array<number> = []
    const userAccounts = await this.dbHandler.getAccountsByUser(user_id)

    if (userAccounts) {
      userAccountsIds = userAccounts.map(account => account.account_id)
      
      if (!userAccountsIds.includes(parseInt(id))) {
        return res.json({
          success: false,
          error: `Account doesn't belong to the user`
        })
      }
    }

    const dbResponse = await this.dbHandler.getTransactionsByAccount(id)

    res.json({
      success: true,
      transactions: dbResponse
    })
  }

  validateTransaction(transaction: Transaction) {
    const validationErrors = this.validate(transaction)

    if (validationErrors.length > 0)
      return { success: false, error: validationErrors }
  }
}

export default TransactionController