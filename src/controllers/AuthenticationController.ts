import { Request, Response } from 'express'
import UserDatabaseHandler from '../database/databaseHandlers/UserDatabaseHandler'

class AuthenticationController {
  private dbHandler: UserDatabaseHandler

  constructor(dbHandler: UserDatabaseHandler) {
    this.dbHandler = dbHandler
  }

  async login(req: Request, res: Response) {
    const { email, user_password } = req.body

    if(!(email && user_password)) {
      res.json({
        success: false,
        message: `Fields email and user_password can't be empty`
      })

      return
    }

    const user = await this.dbHandler.getUserByEmail(email)

    if (!user) {
      res.json({
        success: false,
        message: `No user found with that email address`
      })

      return
    }

    if(!user.checkPassword(user_password)) {
      res.json({
        success: false,
        message: `Incorrect password`
      })

      return
    }

    delete user.user_password
    
    res.json({
      success: true,
      token: '',
      user: user
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