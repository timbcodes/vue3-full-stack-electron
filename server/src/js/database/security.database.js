const executeQuery = require('../services/database_query.service');

const $SQLSecurityOperations = {
  async getTokenByEmail(email) {
    const query = 'SELECT email, reset_token FROM users WHERE email = ?';
    const results = await executeQuery(query, [email]);
    return results[0];
  },
  async verifyResetToken(resetToken) {
    const query = 'SELECT id, email FROM users WHERE reset_token = ?';
    const results = await executeQuery(query, [resetToken]);
    return results[0];
  },
  async updateResetToken(email, resetToken) {
    const query = 'UPDATE users SET reset_token = ? WHERE email = ?';
    await executeQuery(query, [resetToken, email]);
  },
  async nullifyResetToken(email) {
    const query = 'UPDATE users SET reset_token = NULL WHERE reset_token = ?';
    await executeQuery(query, [email]);
  },
  async checkPassword(email) {
    const query = 'SELECT password FROM users WHERE email = ?';
    const results = await executeQuery(query, [email]);
    return results[0];
  },
  async changePassword(email, newPassword) {
    const query = 'UPDATE users SET password = ? WHERE email = ?';
    await executeQuery(query, [newPassword, email]);
  },
  async checkExistingEmail(email) {
    const query = 'SELECT email FROM users WHERE email = ?';
    const results = await executeQuery(query, [email]);
    return results[0];
  },
};

module.exports = $SQLSecurityOperations;
