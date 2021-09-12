import { Connection } from 'mysql2/promise'
import { Router, Request, Response } from 'express'
import { validateTransaction } from '../utils/validation'
import TransactionController from '../controllers/TransactionController'
import TransactionDatabaseHandler from '../database/databaseHandlers/TransactionDatabaseHandler'

export function getTransactionRoutes(dbConnection: Connection) {
  const transactionRoutes = Router()

  const transactionDatabaseHandler = new TransactionDatabaseHandler(dbConnection)
  const transactionController = new TransactionController(transactionDatabaseHandler, validateTransaction)

  transactionRoutes.get('/:id', (req: Request, res: Response) => transactionController.getTransactionsByAccount(req, res))
  transactionRoutes.post('/', (req: Request, res: Response) => transactionController.createTransaction(req, res))

  return transactionRoutes
}