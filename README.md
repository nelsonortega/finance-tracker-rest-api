# Finance Tracker Rest API

Steps to run this project:

1. Run `npm i` command
2. Configure the database variables in the .env file
3. Run `npm start` command

## Notes

If you encounter the error 'Client does not support authentication protocol requested by server, consider upgrading MySQL client' run the following query

`ALTER USER 'user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'`

Replace 'user' and 'password' with the correct information
