import { IDBConnection } from "../createConnection"

class DatabaseHandler {
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

export default DatabaseHandler