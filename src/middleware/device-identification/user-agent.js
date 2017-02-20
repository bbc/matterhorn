const melanite = require('melanite')

const logger = require('../../common/logger')

function identifyDeviceByUserAgent (req, res) {
  const match = melanite.match(req.deviceData)
  const device = match(req.params.ua)
  if (!device) {
    logger.warn('Request received for unknown user-agent:', req.params.ua)
    return res.status(404).json({brand: null, model: null})
  }
  return res.json(device)
}

module.exports = identifyDeviceByUserAgent
