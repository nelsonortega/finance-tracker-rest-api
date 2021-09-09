import { Connection } from "mysql"
import { User } from "../../models/User"

class UserDatabaseHandler {
  private dbConnection: Connection
  
  constructor(dbConnection: Connection) {
    this.dbConnection = dbConnection
  }

  createUser(user: User) {
    this.dbConnection.query(
      `INSERT INTO users (first_name, last_name, email, user_password) VALUES (?, ?, ?, ?)`, 
      [user.first_name, user.last_name, user.email, user.user_password],
      (err, results) => {
        console.log(err)
        console.log(results)
      }
    )
  }
}

export default UserDatabaseHandler