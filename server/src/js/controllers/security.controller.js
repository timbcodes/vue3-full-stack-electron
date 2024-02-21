const responseUtils = require('../utils/response.utils');
const passwordUtils = require('../utils/password.utils');
const jwtUtils = require('../utils/jwt.utils');
const emailHandler = require('../handlers/email.handler');
const $SQLSecurity = require('../database/security.database');

const securityController = {
  async resetPassword (req, res) {
    try {
      const {email} = req.body;
      const user = await $SQLSecurity.getTokenByEmail(email);
      if (user) {
        const resetToken = await passwordUtils.generateResetToken();
        await $SQLSecurity.updateResetToken(email, resetToken);
        const response = await emailHandler.sendResetEmail(email, resetToken);
        responseUtils.sendResponse({res, responseBody: response});
      } else {
        responseUtils.sendResponse({res});
      }
    } catch (error) {
      responseUtils.sendErrorResponse({res, error});
    }
  },
  async verifyResetToken (req, res) {
    try {
      const {reset_token} = req.body;
      const user = await $SQLSecurity.verifyResetToken(reset_token);
      if (user.email) {
        const token = jwtUtils.generateJWT(user);
        responseUtils.sendResponse({res, responseBody: {token}});
        await $SQLSecurity.nullifyResetToken(reset_token);
      } else {
        responseUtils.sendResponse({res});
      }
    } catch (error) {
      responseUtils.sendResponse({res});
    }
  },
  async checkPassword (req, res) {
    try {
      const {email} = req.user;
      const {password} = req.body;
      const user = await $SQLSecurity.checkPassword(email);
      const isPasswordValid = await passwordUtils.verifyPassword(user.password, password);
      if (isPasswordValid) {
        response = {
          message: 'Password is correct',
        };
        responseUtils.sendResponse({res, responseBody: response});
      } else {
        responseUtils.sendResponse({res});
      }
    } catch (error) {
      responseUtils.sendErrorResponse({res, error});
    }
  },
  async changePassword (req, res) {
    try {
      const {email} = req.user;
      const {newPassword} = req.body;
      const hashedPassword = await passwordUtils.hashPassword(newPassword);
      await $SQLSecurity.changePassword(email, hashedPassword);
      response = {
        message: 'Password changed',
      };
      responseUtils.sendResponse({res, responseBody: response});
    } catch (error) {
      responseUtils.sendErrorResponse({res, error});
    }
  },
  async checkExistingEmail(req, res) {
    try {
      const {email} = req.body;
      const user = await $SQLSecurity.checkExistingEmail(email);
      if (user) {
        response = {
          message: 'Email exists',
        };
        responseUtils.sendResponse({res, responseBody: response});
      } else {
        responseUtils.sendResponse({res});
      }
    } catch (error) {
      responseUtils.sendErrorResponse({res, error});
    }
  },
};

module.exports = securityController;