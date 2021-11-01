import { Connection } from 'mysql2/promise'
import { validateJWT } from '../middlewares/jwt'
import { Router, Request, Response } from 'express'
import { handleValidationError } from '../middlewares/handleValidationError'
import AuthenticationController from '../controllers/AuthenticationController'
import UserDatabaseHandler from '../database/databaseHandlers/UserDatabaseHandler'
import { changePasswordValidate, loginValidate } from '../validation/authValidation'

export function getAuthenticationRoutes(dbConnection: Connection) {
  const authenticationRoutes = Router()

  const userDatabaseHandler = new UserDatabaseHandler(dbConnection)
  const authenticationController = new AuthenticationController(userDatabaseHandler)

  authenticationRoutes.post('/login', 
    loginValidate,
    handleValidationError,
    (req: Request, res: Response) => authenticationController.login(req, res)
  )

  authenticationRoutes.post('/change-password', 
    validateJWT, 
    changePasswordValidate,
    handleValidationError,
    (req: Request, res: Response) => authenticationController.changePassword(req, res)
  )

  return authenticationRoutes
}