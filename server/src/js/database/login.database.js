const executeQuery = require('../services/database_query.service');

const loginOperations = {
  async login(email) {
    const query = 'SELECT email, id, password FROM users WHERE email = ?';
    const results = await executeQuery(query, [email]);
    return results[0];
  },
};

module.exports = loginOperations;