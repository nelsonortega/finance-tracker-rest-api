import { Connection } from 'mysql2/promise'
import { validateJWT } from '../middlewares/jwt'
import { validateUser } from '../utils/validation'
import { Router, Request, Response } from 'express'
import UserController from '../controllers/UserController'
import UserDatabaseHandler from '../database/databaseHandlers/UserDatabaseHandler'

export function getUserRoutes(dbConnection: Connection) {
  const userRoutes = Router()

  const userDatabaseHandler = new UserDatabaseHandler(dbConnection)
  const userController = new UserController(userDatabaseHandler, validateUser)

  userRoutes.post('/', (req: Request, res: Response) => userController.createUser(req, res))
  userRoutes.patch('/', validateJWT, (req: Request, res: Response) => userController.updateUser(req, res))
  userRoutes.delete('/', validateJWT, (req: Request, res: Response) => userController.deleteUser(req, res))
  userRoutes.patch('/change-email', validateJWT, (req: Request, res: Response) => userController.changeEmail(req, res))

  return userRoutes
}