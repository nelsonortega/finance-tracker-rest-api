import './utils/configDotenv'
import express, { Request, Response } from 'express'
import UserController from './controllers/UserController'
import { createConnection } from './database/createConnection'
import UserDatabaseHandler from './database/databaseHandlers/UserDatabaseHandler'

async function main() {
  const PORT = process.env.APP_PORT

  const app = express()

  app.use(express.json())

  const dbConnection = await createConnection()

  const userDatabaseHandler = new UserDatabaseHandler(dbConnection)

  const userController = new UserController(userDatabaseHandler)

  app.post('/users', (req: Request, res: Response) => userController.createUser(req, res))

  app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
}

main()