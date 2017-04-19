const logger = require('../../common/logger')

module.exports = function (startTime) {
  const timeTaken = Date.now() - startTime
  logger.log(`Matterhorn request served in: ${timeTaken}ms`)
})
