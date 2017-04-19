const logger = require('./logger')

module.exports = function (startTime) {
  const timeTaken = Date.now() - startTime
  logger.info(`Matterhorn request served in: ${timeTaken}ms`)
}
