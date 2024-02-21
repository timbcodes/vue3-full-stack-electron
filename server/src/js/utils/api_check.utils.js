const responseUtils = require('./response.utils')
/*
 *
 * Utility functions for API Key Authentication
**/

const authenticateKey = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  if (apiKey !== process.env.API_KEY) {
    return responseUtils.sendErrorResponse({
      res,
      message: 'API Key is Not Valid',
      statusCode: 401,
      responseBody: [],
    })
  }
  next();
}

module.exports = { authenticateKey };
