import { User } from '../models/User'
import { Request, Response } from 'express'
import { parseError } from '../utils/dbParseError'
import UserDatabaseHandler from '../database/databaseHandlers/UserDatabaseHandler'

class UserController {
  private dbHandler: UserDatabaseHandler
  private validateUser: (user: User) => Array<string>

  constructor(dbHandler: UserDatabaseHandler, validateUser: (user: User) => Array<string>) {
    this.dbHandler = dbHandler
    this.validateUser = validateUser
  }

  async createUser(req: Request, res: Response) {
    const user = new User(req.body)

    const validationErrors = this.validateUser(user)

    if (validationErrors.length > 0) {
      res.json({
        success: false,
        error: validationErrors
      })

      return
    }

    user.hashPassword()

    const dbResponse = await this.dbHandler.createUser(user)

    if (!dbResponse.success && dbResponse.error) {
      res.json({
        success: false,
        error: parseError(dbResponse.error)
      })

      return
    }

    res.json({
      success: true,
      message: `User created with Id ${dbResponse.createdUserId}`
    })
  }

  updateUser(_req: Request, res: Response) {
    res.json({
      success: false,
      message: `Not yet implemented`
    })
  }

  deleteUser(_req: Request, res: Response) {
    res.json({
      success: false,
      message: `Not yet implemented`
    })
  }
}

export default UserController