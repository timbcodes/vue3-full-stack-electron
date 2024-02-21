const responseUtils = require("../utils/response.utils");
const passwordUtils = require("../utils/password.utils");
const jwtUtils = require("../utils/jwt.utils");
const $SQLLogin = require("../database/login.database");

const securityController = {
  async login (req, res) {
    try {
      const {email, password} = req.body;
      const user = await $SQLLogin.login(email);
      if (user) {
        const isPasswordCorrect = await passwordUtils.verifyPassword(user.password, password);
        if (isPasswordCorrect) {
          response = {
            email: user.email,
            id: user.id,
          };
          const token = jwtUtils.generateJWT(response);
          (token);
          responseUtils.sendResponse({res, responseBody: {response, token}});
        } else {
          responseUtils.sendNotFound({res, statusCode: 401, responseBody: {message: 'Unauthorized'}});
        }
      } else {
        responseUtils.sendNotFound({res, statusCode: 401, responseBody: {message: 'Unauthorized'}});
      }
    } catch (error) {
      console.log("login: error = ", error);
      responseUtils.sendErrorResponse({res, responseBody: error});
    }
  },
};

module.exports = securityController;