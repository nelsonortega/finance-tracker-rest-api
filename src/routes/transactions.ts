import { Connection } from 'mysql2/promise'
import { validateJWT } from '../middlewares/jwt'
import { Router, Request, Response } from 'express'
import TransactionController from '../controllers/TransactionController'
import { handleValidationError } from '../middlewares/handleValidationError'
import TransactionDatabaseHandler from '../database/databaseHandlers/TransactionDatabaseHandler'
import { createTransactionValidate, transactionValidate } from '../validation/transactionValidation'

export function getTransactionRoutes(dbConnection: Connection) {
  const transactionRoutes = Router()

  const transactionDatabaseHandler = new TransactionDatabaseHandler(dbConnection)
  const transactionController = new TransactionController(transactionDatabaseHandler)

  transactionRoutes.get('/:id', 
    validateJWT,
    transactionValidate,
    handleValidationError,
    (req: Request, res: Response) => transactionController.getTransactionsByAccount(req, res)
  )
  
  transactionRoutes.post('/', 
    validateJWT,
    createTransactionValidate,
    handleValidationError,
    (req: Request, res: Response) => transactionController.createTransaction(req, res)
  )

  return transactionRoutes
}