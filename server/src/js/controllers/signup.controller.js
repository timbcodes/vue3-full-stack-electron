const responseUtils = require('../utils/response.utils');
const passwordUtils = require('../utils/password.utils');
const $SQLSignupOperations = require('../database/signup.database');

const signupController = {
  async createUser (req, res) {
    try {
      const data = req.body;
      const hashedPassword = await passwordUtils.hashPassword(data.password);
      data.password = hashedPassword;
      const newUser = await $SQLSignupOperations.addNewUser(data);
      if (newUser) {
        responseUtils.sendResponse({res, responseBody: newUser});
      } else {
        responseUtils.sendNotFound({res});
      }
    } catch (error) {
      console.log("createUser: error = ", error);
      responseUtils.sendErrorResponse({res, responseBody: error});
    }
  },
};

module.exports = signupController;