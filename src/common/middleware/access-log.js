const logger = require('../logger')

const calculateDuration = (startTime) => {
  const diff = process.hrtime(startTime)
  const ms = diff[0] * 1e3 + diff[1] * 1e-6

  return ms.toFixed(3)
}

module.exports = (req, res, next) => {
  const originalEnd = res.end
  const startTime = process.hrtime()

  res.end = (chunk, encoding) => {
    logger.info({
      path: req.url,
      method: req.method.toLowerCase(),
      type: 'access',
      statusCode: res.statusCode,
      duration: calculateDuration(startTime)
    })

    res.end = originalEnd
    res.end(chunk, encoding)
  }

  next()
}
