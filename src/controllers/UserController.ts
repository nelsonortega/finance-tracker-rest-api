import { User } from '../models/User'
import { Request, Response } from 'express'
import { parseError } from '../utils/dbParseError'
import UserDatabaseHandler from '../database/databaseHandlers/UserDatabaseHandler'

class UserController {
  private dbHandler: UserDatabaseHandler
  private validate: (user: User) => Array<string>

  constructor(dbHandler: UserDatabaseHandler, validate: (user: User) => Array<string>) {
    this.dbHandler = dbHandler
    this.validate = validate
  }

  async createUser(req: Request, res: Response) {
    const user = new User(req.body)

    const invalidUser = this.validateUser(user)
    if (invalidUser) return res.json(invalidUser)

    user.hashPassword()

    const dbResponse = await this.dbHandler.createUser(user)

    if (dbResponse.error) {
      return res.json({
        success: false,
        error: parseError(dbResponse.error)
      })      
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
      return res.json({
        success: false,
        message: `No user found with that id`
      })      
    }

    user.first_name = first_name
    user.last_name = last_name

    const invalidUser = this.validateUser(user)
    if (invalidUser) return res.json(invalidUser)

    const dbResponse = await this.dbHandler.updateUser(user)

    if (dbResponse.error) {
      return res.json({
        success: false,
        error: parseError(dbResponse.error) 
      })
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
      return res.json({
        success: false,
        message: `Field user_password can't be empty`
      })
    }

    const user = await this.dbHandler.getUserById(user_id)

    if (!user) {
      return res.json({
        success: false,
        message: `No user found`
      })      
    }

    if(!user.checkPassword(user_password)) {
      return res.json({
        success: false,
        message: `Incorrect password`
      })
    }

    const dbResponse = await this.dbHandler.deleteUser(user_id)

    if (dbResponse.error) {
      return res.json({
        success: false,
        error: parseError(dbResponse.error) 
      })      
    }

    res.json({
      success: true,
      message: dbResponse.message
    })
  }

  async changeEmail(req: Request, res: Response) {
    const { user_id } = req.params
    const { new_email, user_password } = req.body

    if (!user_password) {
      return res.json({
        success: false,
        message: `Field user_password is required`
      })      
    }

    const user = await this.dbHandler.getUserById(user_id)

    if (!user) {
      return res.json({
        success: false,
        message: `No user found with that id`
      })      
    }

    if (!user.checkPassword(user_password)) {
      return res.json({
        success: false,
        message: `Incorrect password`
      })      
    }

    if (user.email === new_email) {
      return res.json({
        success: false,
        message: `New email can't be the same as the old one`
      })      
    }

    user.email = new_email

    const invalidUser = this.validateUser(user)
    if (invalidUser) return res.json(invalidUser)

    const dbResponse = await this.dbHandler.updateUser(user)

    if (dbResponse.error) {
      return res.json({
        success: false,
        error: parseError(dbResponse.error)
      })
    }

    res.json({
      success: true,
      message: `Email changed`
    })
  }

  validateUser(user: User) {
    const validationErrors = this.validate(user)

    if (validationErrors.length > 0)
      return { success: false, error: validationErrors }
  }
}

export default UserController