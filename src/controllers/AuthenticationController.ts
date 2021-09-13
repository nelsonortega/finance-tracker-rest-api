import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { parseError } from '../utils/dbParseError'
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
      return res.json({
        success: false,
        message: `Fields email and user_password can't be empty`
      })
    }

    const user = await this.dbHandler.getUserByEmail(email)

    if (!user) {
      return res.json({
        success: false,
        message: `No user found with that email address`
      })
    }

    if(!user.checkPassword(user_password)) {
      return res.json({
        success: false,
        message: `Incorrect password`
      })
    }

    delete user.user_password

    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_TOKEN_SECRET as string, { expiresIn: '24h'})
    
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
      return res.json({
        success: false,
        error: validationErrors
      })      
    }

    const user = await this.dbHandler.getUserById(user_id)

    if (!user) {
      return res.json({
        success: false,
        message: `No user found with that id`
      })      
    }

    if (!user.checkPassword(old_password)) {
      return res.json({
        success: false,
        message: `Old password is incorrect`
      })
    }

    if (user.checkPassword(user_password)) {
      return res.json({
        success: false,
        message: `New password can't be the same as the old one`
      })
    }

    user.user_password = user_password
    user.hashPassword()

    const dbResponse = await this.dbHandler.updateUser(user)

    if (dbResponse.error) {
      return res.json({
        success: false,
        error: parseError(dbResponse.error) 
      })      
    }

    res.json({
      success: true,
      message: `Password changed`
    })
  }
}

export default AuthenticationController