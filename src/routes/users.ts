import { Connection } from 'mysql2/promise'
import { validateUser } from '../utils/validation'
import { Router, Request, Response } from 'express'
import UserController from '../controllers/UserController'
import UserDatabaseHandler from '../database/databaseHandlers/UserDatabaseHandler'

export function getUserRoutes(dbConnection: Connection) {
  const userRoutes = Router()

  const userDatabaseHandler = new UserDatabaseHandler(dbConnection)
  const userController = new UserController(userDatabaseHandler, validateUser)

  userRoutes.post('/', (req: Request, res: Response) => userController.createUser(req, res))
  userRoutes.delete('/', (req: Request, res: Response) => userController.deleteUser(req, res))
  userRoutes.patch('/', (req: Request, res: Response) => userController.updateUser(req, res))

  return userRoutes
}