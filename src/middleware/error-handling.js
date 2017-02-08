const logger = require('../common/logger')

function errorHandlingMiddleware (error, req, res, next) {
  error = Object.assign(error, { responseError: true, url: req.url })
  logger.error(error)
  return res.json({ code: error.code, error: error.message })
}

module.exports = errorHandlingMiddleware
