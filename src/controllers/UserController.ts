import { User } from '../models/User'
import { Request, Response } from 'express'
import userDatabaseHandler from '../database/databaseHandlers/UserDatabaseHandler'

class UserController {
  private dbHandler: userDatabaseHandler

  constructor(dbHandler: userDatabaseHandler) {
    this.dbHandler = dbHandler
  }

  async createUser(req: Request, res: Response) {
    const user = new User(req.body)
    user.hashPassword()

    const dbResponse = await this.dbHandler.createUser(user)

    if (!dbResponse.success) {
      res.json({
        success: false,
        error: dbResponse.error
      })
    }

    res.json({
      success: true,
      message: `User created with Id ${dbResponse.createdUserId}`
    })
  }
}

export default UserController