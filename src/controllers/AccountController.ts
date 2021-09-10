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
}

export default AccountController