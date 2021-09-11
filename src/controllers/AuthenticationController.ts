import { Request, Response } from 'express'
import UserDatabaseHandler from '../database/databaseHandlers/UserDatabaseHandler'

class AuthenticationController {
  private dbHandler: UserDatabaseHandler

  constructor(dbHandler: UserDatabaseHandler) {
    this.dbHandler = dbHandler
  }

  login(_req: Request, res: Response) {
    this.dbHandler.getUserById(1)
    
    res.json({
      success: false,
      message: `Not yet implemented`
    })
  }

  logout(_req: Request, res: Response) {
    res.json({
      success: false,
      message: `Not yet implemented`
    })
  }
}

export default AuthenticationController