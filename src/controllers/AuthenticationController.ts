import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import UserDatabaseHandler from '../database/databaseHandlers/UserDatabaseHandler'

class AuthenticationController {
  private dbHandler: UserDatabaseHandler
  private validatePassword: (password: string, oldPassword: string) => Array<string>

  constructor(dbHandler: UserDatabaseHandler, validatePassword: (password: string, oldPassword: string) => Array<string>) {
    this.dbHandler = dbHandler
    this.validatePassword = validatePassword
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

    const token = jwt.sign({ user_id: user.user_id, email: user.email }, process.env.JWT_TOKEN_SECRET as string, { expiresIn: '24h'})
    
    res.json({
      success: true,
      token: token,
      user: user
    })
  }

  async changePassword(req: Request, res: Response) {
    const { user_id } = req.params
    const { old_password, user_password } = req.body

    const validationErrors = this.validatePassword(user_password, old_password)

    if (validationErrors.length > 0) {
      res.json({
        success: false,
        error: validationErrors
      })

      return
    }

    const user = await this.dbHandler.getUserById(user_id)

    if (!user) {
      res.json({
        success: false,
        message: `No user found with that id`
      })

      return
    }

    if (!user.checkPassword(old_password)) {
      res.json({
        success: false,
        message: `Old password is incorrect`
      })

      return
    }

    if (user.checkPassword(user_password)) {
      res.json({
        success: false,
        message: `New password can't be the same as the old one`
      })

      return
    }

    user.user_password = user_password
    user.hashPassword()

    const dbResponse = await this.dbHandler.updateUser(user)

    if (dbResponse.error) {
      res.json({
        success: false,
        error: dbResponse.error.code
      })

      return
    }

    res.json({
      success: true,
      message: `Password changed`
    })
  }
}

export default AuthenticationController