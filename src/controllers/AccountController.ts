import { Request, Response } from 'express'
import { Account } from '../models/Account'
import AccountDatabaseHandler from '../database/databaseHandlers/AccountDatabaseHandler'

class AccountController {
  private dbHandler: AccountDatabaseHandler
  private validateAccount: (account: Account) => Array<string>

  constructor(dbHandler: AccountDatabaseHandler, validateAccount: (account: Account) => Array<string>) {
    this.dbHandler = dbHandler
    this.validateAccount = validateAccount
  }

  async createAccount(req: Request, res: Response) {
    const account = new Account(req.body)

    this.validateAccount(account)
    this.dbHandler.createAccount()

    res.json({
      success: true,
      message: `Account created`
    })
  }

  getAccountsByUser(_req: Request, res: Response) {
    res.json({
      success: false,
      message: `Not yet implemented`
    })
  }

  updateAccount(_req: Request, res: Response) {
    res.json({
      success: false,
      message: `Not yet implemented`
    })
  }

  deleteAccount(_req: Request, res: Response) {
    res.json({
      success: false,
      message: `Not yet implemented`
    })
  }
}

export default AccountController