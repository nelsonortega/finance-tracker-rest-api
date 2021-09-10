import './utils/configDotenv'
import express, { Request, Response } from 'express'
import UserController from './controllers/UserController'
import { createConnection } from './database/createConnection'
import AccountController from './controllers/AccountController'
import TransactionController from './controllers/TransactionController'
import UserDatabaseHandler from './database/databaseHandlers/UserDatabaseHandler'
import AccountDatabaseHandler from './database/databaseHandlers/AccountDatabaseHandler'
import { validateAccount, validateTransaction, validateUser } from './utils/validation'
import TransactionDatabaseHandler from './database/databaseHandlers/TransactionDatabaseHandler'

async function main() {
  const PORT = process.env.APP_PORT

  const app = express()

  app.use(express.json())

  const dbConnection = await createConnection()

  const userDatabaseHandler = new UserDatabaseHandler(dbConnection)
  const accountDatabaseHandler = new AccountDatabaseHandler(dbConnection)
  const transactionDatabaseHandler = new TransactionDatabaseHandler(dbConnection)

  const userController = new UserController(userDatabaseHandler, validateUser)
  const accountController = new AccountController(accountDatabaseHandler, validateAccount)
  const transactionController = new TransactionController(transactionDatabaseHandler, validateTransaction)

  app.post('/users', (req: Request, res: Response) => userController.createUser(req, res))
  app.delete('/users')
  app.patch('/users')
  app.get('/accounts')
  app.post('/accounts', (req: Request, res: Response) => accountController.createAccount(req, res))
  app.delete('/accounts')
  app.patch('/accounts')
  app.get('/transactions')
  app.post('/transactions', (req: Request, res: Response) => transactionController.createTransaction(req, res))
  app.post('/auth/login')
  app.post('/auth/logout')

  app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
}

main()