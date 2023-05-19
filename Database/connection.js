const mysql = require('mysql2');
const Sequelize = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD, // Access the password from the environment variable
    database: 'Employee_Tracker_db'
});

let sequelize;

if (process.env.JAWSDB_URL) {
    sequlize = Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize =  new Sequelize(
        proccess.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    );
}

module.exports = sequelize;
module.exports = db;
