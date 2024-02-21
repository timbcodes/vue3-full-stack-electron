const jwtUtils = require('../utils/jwt.utils')
const responseUtils = require('../utils/response.utils')

const authenticate = async (req, res, next) => {
  let token = req.headers.authorization
  if (!token) {
    return responseUtils.sendErrorResponse({
      res,
      message: 'Token Missing',
      statusCode: 401,
      responseBody: []
    })
  }
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length)
    if (!token || token === '') responseUtils.sendErrorResponse({ res, message: 'Token Missing', statusCode: 401 })
  }
  const decoded = jwtUtils.verifyJWT(token)
  if (!decoded) {
    return responseUtils.sendErrorResponse({
      res,
      message: 'Invalid Token',
      statusCode: 403
    })
  }
  req.user = decoded;
  return next()
}

module.exports = authenticate;
