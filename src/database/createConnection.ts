import mysql, { Connection } from 'mysql'

export function createConnection() {
  let dbConnection: Connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB
  })

  return dbConnection
}