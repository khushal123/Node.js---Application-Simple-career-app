// DB_HOSTNAME="localhost"
// DB_USERNAME="demo"
// DB_PASSWORD="test"
// DB_NAME="millow"
let dotenv = require("dotenv")
dotenv.config();
module.exports = {
    "development": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOSTNAME,
        "dialect": "mysql"
    },
    "test": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOSTNAME,
        "dialect": "mysql"
    },
    "production": {
        "username": "demo",
        "password": "test",
        "database": "database_development",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
}
