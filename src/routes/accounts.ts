import { Connection } from 'mysql2/promise'
import { validateJWT } from '../middlewares/jwt'
import { Router, Request, Response } from 'express'
import AccountController from '../controllers/AccountController'
import { handleValidationError } from '../middlewares/handleValidationError'
import AccountDatabaseHandler from '../database/databaseHandlers/AccountDatabaseHandler'
import { accountValidate, deleteAccountValidate, updateAccountValidate } from '../validation/accountValidation'

export function getAccountRoutes(dbConnection: Connection) {
  const accountRoutes = Router()

  const accountDatabaseHandler = new AccountDatabaseHandler(dbConnection)
  const accountController = new AccountController(accountDatabaseHandler)

  accountRoutes.get('/', 
    validateJWT, 
    (req: Request, res: Response) => accountController.getAccountsByUser(req, res)
  )

  accountRoutes.post('/', 
    validateJWT, 
    accountValidate,
    handleValidationError,
    (req: Request, res: Response) => accountController.createAccount(req, res)
  )
  
  accountRoutes.delete('/:id', 
    validateJWT, 
    deleteAccountValidate,
    handleValidationError,
    (req: Request, res: Response) => accountController.deleteAccount(req, res)
  )

  accountRoutes.patch('/:id', 
    validateJWT, 
    updateAccountValidate,
    handleValidationError,
    (req: Request, res: Response) => accountController.updateAccount(req, res)
  )

  return accountRoutes
}