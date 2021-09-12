import { Connection } from 'mysql2/promise'
import { validateJWT } from '../middlewares/jwt'
import { Router, Request, Response } from 'express'
import { validatePassword } from '../utils/validation'
import AuthenticationController from '../controllers/AuthenticationController'
import UserDatabaseHandler from '../database/databaseHandlers/UserDatabaseHandler'

export function getAuthenticationRoutes(dbConnection: Connection) {
  const authenticationRoutes = Router()

  const userDatabaseHandler = new UserDatabaseHandler(dbConnection)
  const authenticationController = new AuthenticationController(userDatabaseHandler, validatePassword)

  authenticationRoutes.post('/login', (req: Request, res: Response) => authenticationController.login(req, res))
  authenticationRoutes.post('/change-password', validateJWT, (req: Request, res: Response) => authenticationController.changePassword(req, res))

  return authenticationRoutes
}