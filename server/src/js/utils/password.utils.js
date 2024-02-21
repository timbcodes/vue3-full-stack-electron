const argon2 = require('argon2');
const { v4: uuidv4 } = require('uuid');

const passwordUtils = {
  hashPassword: async (password) => {
    try {
      const hash = await argon2.hash(password);
      return hash;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  verifyPassword: async (hash, password) => {
    try {
      const result = await argon2.verify(hash, password);
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  generateResetToken: async () => {
    try {
      const token = uuidv4();
      return token;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};

module.exports = passwordUtils;