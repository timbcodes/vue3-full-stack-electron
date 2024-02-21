const executeQuery = require('../services/database_query.service');

const $SQLSignupOperations = {
  async addNewUser(data) {
    const {
      email,
      password,
    } = data;
    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    const results = await executeQuery(query, [email, password]);
    return {
      user: results,
    }
  }
};

module.exports = $SQLSignupOperations;