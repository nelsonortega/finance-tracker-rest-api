import { Request, Response } from 'express'
import { Account } from '../models/Account'
import { parseError } from '../utils/dbParseError'
import AccountDatabaseHandler from '../database/databaseHandlers/AccountDatabaseHandler'

class AccountController {
  private dbHandler: AccountDatabaseHandler
  private validate: (account: Account) => Array<string>

  constructor(dbHandler: AccountDatabaseHandler, validate: (account: Account) => Array<string>) {
    this.dbHandler = dbHandler
    this.validate = validate
  }

  async createAccount(req: Request, res: Response) {
    const { user_id } = req.params
    const account = new Account(req.body)

    account.user_id = parseInt(user_id)

    const invalidAccount = this.validateAccount(account)
    if (invalidAccount) return res.json(invalidAccount)

    const dbResponse = await this.dbHandler.createAccount(account)

    if (dbResponse.error) {
      return res.json({
        success: false,
        error: parseError(dbResponse.error)
      })      
    }

    res.json({
      success: true,
      message: `Account created with Id ${dbResponse.createdAccountId}`
    })
  }

  async getAccountsByUser(req: Request, res: Response) {
    const { user_id } = req.params

    const dbResponse = await this.dbHandler.getAccountsByUser(user_id)

    if (!dbResponse) {
      return res.json({
        success: false,
        error: `No accounts found for this user`
      })
    }

    res.json({
      success: true,
      data: dbResponse
    })
  }

  async updateAccount(req: Request, res: Response) {
    const { user_id, id } = req.params
    const { account_name, currency } = req.body
    
    const account = await this.dbHandler.getAccountById(id)

    if (!account) {
      return res.json({
        success: false,
        error: `No account found`
      })
    }

    if (parseInt(user_id) !== account.user_id) {
      return res.json({
        success: false,
        error: `Account doesn't belong to user`
      })
    }

    account.account_name = account_name
    account.currency = currency

    const invalidAccount = this.validateAccount(account)
    if (invalidAccount) return res.json(invalidAccount)

    const dbResponse = await this.dbHandler.updateAccount(account)

    if (dbResponse.error) {
      return res.json({
        success: false,
        error: parseError(dbResponse.error)
      })      
    }

    res.json({
      success: true,
      message: `Account updated`
    })
  }

  deleteAccount(_req: Request, res: Response) {
    res.json({
      success: false,
      message: `Not yet implemented`
    })
  }

  validateAccount(account: Account) {
    const validationErrors = this.validate(account)

    if (validationErrors.length > 0)
      return { success: false, error: validationErrors }
  }
}

export default AccountController