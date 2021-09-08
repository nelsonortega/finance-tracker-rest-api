import express from 'express'
import './utils/configDotenv'
import userDatabaseHandler from './database'

const PORT = process.env.APP_PORT
const app = express()

app.get('/users', () => {
  userDatabaseHandler.createUser()
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})