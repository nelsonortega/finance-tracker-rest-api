import { Connection } from 'mysql2/promise'
import { validateJWT } from '../middlewares/jwt'
import { Router, Request, Response } from 'express'
import UserController from '../controllers/UserController'
import { changeEmailValidate, createUserValidate, deleteUserValidate, updateUserValidate } from '../validation/userValidation'
import { handleValidationError } from '../middlewares/handleValidationError'
import UserDatabaseHandler from '../database/databaseHandlers/UserDatabaseHandler'

export function getUserRoutes(dbConnection: Connection) {
  const userRoutes = Router()

  const userDatabaseHandler = new UserDatabaseHandler(dbConnection)
  const userController = new UserController(userDatabaseHandler)

  userRoutes.post('/', 
    createUserValidate, 
    handleValidationError,
    (req: Request, res: Response) => userController.createUser(req, res)
  )

  userRoutes.patch('/', 
    validateJWT,
    updateUserValidate,
    handleValidationError,
    (req: Request, res: Response) => userController.updateUser(req, res)
  )

  userRoutes.delete('/', 
    validateJWT,
    deleteUserValidate,
    handleValidationError,
    (req: Request, res: Response) => userController.deleteUser(req, res)
  )
  
  userRoutes.patch('/change-email', 
    validateJWT, 
    changeEmailValidate,
    handleValidationError,
    (req: Request, res: Response) => userController.changeEmail(req, res)
  )

  return userRoutes
}