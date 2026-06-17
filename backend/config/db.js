require("dotenv").config();
const mysql = require("mysql2/promise");

let poolConfig = {};

if (process.env.DATABASE_URL) {
  poolConfig = {
    uri: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Required for Aiven/Cloud MySQL
  };
} else {
  poolConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };
}

const pool = mysql.createPool(poolConfig);

module.exports = pool;
