import dotenv from 'dotenv'
import express from 'express'
import { getUserRoutes } from './routes/users'
import { getAccountRoutes } from './routes/accounts'
import { getTransactionRoutes } from './routes/transactions'
import { createConnection } from './database/createConnection'
import { getAuthenticationRoutes } from './routes/authentication'

dotenv.config()

async function main() {
  const PORT = process.env.APP_PORT
  
  const app = express()
  
  app.use(express.json())
  
  const dbConnection = await createConnection()
  
  app.use('/users', getUserRoutes(dbConnection))
  app.use('/accounts', getAccountRoutes(dbConnection))
  app.use('/transactions', getTransactionRoutes(dbConnection))
  app.use('/authentication', getAuthenticationRoutes(dbConnection))
  
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
}

main()