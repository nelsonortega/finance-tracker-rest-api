import { createConnection } from "./createConnection";
import UserDatabaseHandler from "./databaseHandlers/UserDatabaseHandler";

let dbConnection = createConnection()

let userDatabaseHandler = new UserDatabaseHandler(dbConnection)

export default userDatabaseHandler