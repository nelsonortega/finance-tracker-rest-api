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

  async updateUser(req: Request, res: Response) {
    const { user_id } = req.params
    const { first_name, last_name } = req.body

    const user = await this.dbHandler.getUserById(user_id)

    if (!user) {
      res.json({
        success: false,
        message: `No user found with that id`
      })

      return
    }

    user.first_name = first_name
    user.last_name = last_name

    const validationErrors = this.validateUser(user)

    if (validationErrors.length > 0) {
      res.json({
        success: false,
        error: validationErrors
      })

      return
    }

    const dbResponse = await this.dbHandler.updateUser(user)

    if (dbResponse.error) {
      res.json({
        success: false,
        error: parseError(dbResponse.error) 
      })

      return
    }

    res.json({
      success: true,
      message: `User updated`
    })
  }

  async deleteUser(req: Request, res: Response) {
    const { user_id } = req.params
    const { user_password } = req.body

    if(!user_password) {
      res.json({
        success: false,
        message: `Field user_password can't be empty`
      })

      return
    }

    const user = await this.dbHandler.getUserById(user_id)

    if (!user) {
      res.json({
        success: false,
        message: `No user found`
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

    const dbResponse = await this.dbHandler.deleteUser(user_id)

    if (dbResponse.error) {
      res.json({
        success: false,
        error: parseError(dbResponse.error) 
      })

      return
    }

    res.json({
      success: true,
      message: dbResponse.message
    })
  }
}

export default UserController