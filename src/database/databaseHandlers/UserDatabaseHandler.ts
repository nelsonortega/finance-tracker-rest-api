import { IDBConnection } from "../createConnection"

class UserDatabaseHandler {
  private dbConnection: IDBConnection
  
  constructor(dbConnection: IDBConnection) {
    this.dbConnection = dbConnection
  }

  createUser() {
    this.dbConnection.query(`select * from users`, (_err, resuls) => {
      console.log(resuls)
    })
  }
}

export default UserDatabaseHandler