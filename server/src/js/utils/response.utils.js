const responseUtils = {
  sendResponse ({ res, statusCode = 200, responseBody }) {
    res.status(statusCode).send(responseBody)
  },
  sendNotFound ({ res, statusCode = 404, responseBody = [] }) {
    res.status(statusCode).send(responseBody)
  },
  sendErrorResponse ({ res, statusCode = 500, message = 'error', responseBody }) {
    res.status(statusCode).send({
      responseBody,
      message
    })
  },
}


module.exports = responseUtils