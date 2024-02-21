require('dotenv').config();
const db = require('mysql2/promise');

const dbConnection = {
  async connect () {
    const connection = await db.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
    return connection;
  },
  async endConnection (connection) {
    await connection.end();
  },
};

module.exports = dbConnection;