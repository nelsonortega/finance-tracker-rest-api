import { User } from '../models/User'
import { Request, Response } from 'express'
import userDatabaseHandler from "../database/databaseHandlers/UserDatabaseHandler"

class UserController {
  private dbHandler: userDatabaseHandler

  constructor(dbHandler: userDatabaseHandler) {
    this.dbHandler = dbHandler
  }

  createUser(req: Request, res: Response) {
    const user = new User(req.body)
    user.hashPassword()

    this.dbHandler.createUser()

    res.json({
      success: true,
      message: 'User created'
    })
  }
}

export default UserController