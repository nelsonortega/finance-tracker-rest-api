import { Connection } from 'mysql2/promise'
import { validateJWT } from '../middlewares/jwt'
import { Router, Request, Response } from 'express'
import { validateAccount } from '../utils/validation'
import AccountController from '../controllers/AccountController'
import AccountDatabaseHandler from '../database/databaseHandlers/AccountDatabaseHandler'

export function getAccountRoutes(dbConnection: Connection) {
  const accountRoutes = Router()

  const accountDatabaseHandler = new AccountDatabaseHandler(dbConnection)
  const accountController = new AccountController(accountDatabaseHandler, validateAccount)

  accountRoutes.get('/', validateJWT, (req: Request, res: Response) => accountController.getAccountsByUser(req, res))
  accountRoutes.post('/', validateJWT, (req: Request, res: Response) => accountController.createAccount(req, res))
  accountRoutes.delete('/:id', validateJWT, (req: Request, res: Response) => accountController.deleteAccount(req, res))
  accountRoutes.patch('/:id', validateJWT, (req: Request, res: Response) => accountController.updateAccount(req, res))

  return accountRoutes
}