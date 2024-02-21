const dbConnection = require('../config/database.config');

const executeQuery = async (query, params) => {
  let connection;
  try {
    connection = await dbConnection.connect();
    const [results] = await connection.execute(query, params);
    return results;
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      await dbConnection.endConnection(connection);
    }
  }
};

module.exports = executeQuery;