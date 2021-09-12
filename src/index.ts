import './utils/configDotenv'
import { validateJWT } from './middlewares/jwt'
import express, { Request, Response } from 'express'
import UserController from './controllers/UserController'
import { createConnection } from './database/createConnection'
import AccountController from './controllers/AccountController'
import TransactionController from './controllers/TransactionController'
import AuthenticationController from './controllers/AuthenticationController'
import UserDatabaseHandler from './database/databaseHandlers/UserDatabaseHandler'
import AccountDatabaseHandler from './database/databaseHandlers/AccountDatabaseHandler'
import TransactionDatabaseHandler from './database/databaseHandlers/TransactionDatabaseHandler'
import { validateAccount, validatePassword, validateTransaction, validateUser } from './utils/validation'

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
  const authenticationController = new AuthenticationController(userDatabaseHandler, validatePassword)
  const transactionController = new TransactionController(transactionDatabaseHandler, validateTransaction)

  app.post('/users', (req: Request, res: Response) => userController.createUser(req, res))
  app.delete('/users/:id', (req: Request, res: Response) => userController.deleteUser(req, res))
  app.patch('/users/:id', (req: Request, res: Response) => userController.updateUser(req, res))
  app.get('/accounts/:id', (req: Request, res: Response) => accountController.getAccountsByUser(req, res))
  app.post('/accounts', (req: Request, res: Response) => accountController.createAccount(req, res))
  app.delete('/accounts/:id', (req: Request, res: Response) => accountController.deleteAccount(req, res))
  app.patch('/accounts/:id', (req: Request, res: Response) => accountController.updateAccount(req, res))
  app.get('/transactions/:id', (req: Request, res: Response) => transactionController.getTransactionsByAccount(req, res))
  app.post('/transactions', (req: Request, res: Response) => transactionController.createTransaction(req, res))
  app.post('/authentication/login', (req: Request, res: Response) => authenticationController.login(req, res))
  app.post('/authentication/change-password', validateJWT, (req: Request, res: Response) => authenticationController.changePassword(req, res))

  app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
}

main()