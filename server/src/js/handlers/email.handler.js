const responseUtils = require('../utils/response.utils');
const mailerService = require('../services/mailer.service');

const emailHandler = {
  async sendSecurityEmail(req, res) {
    try {
      const { email } = req.body;
      const code = Math.floor(100000 + Math.random() * 900000);
      const result = await mailerService.sendTwoFactorAuthEmail(email, code);
      if(result) {
        responseUtils.sendResponse({res, responseBody: {result: result, code: code}});
      } else {
        responseUtils.sendErrorResponse({res});
      }
    } catch (error) {
      console.log("sendSecurityEmail: error = ", error);
      responseUtils.sendErrorResponse({res, responseBody: {error: error, message: 'Error sending email'}});
    }
  },
  async sendResetEmail(email, resetToken) {
    try {
      const result = await mailerService.sendResetPasswordEmail(email, resetToken);
      return result;
    } catch (error) {
      console.log("sendResetEmail: error = ", error);
      return error;
    }
  },
};

module.exports = emailHandler;