import mysql, { Connection } from 'mysql2/promise'

export async function createConnection() {
  let dbConnection: Connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB
  })

  return dbConnection
}