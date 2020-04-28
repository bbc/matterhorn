const melanite = require('melanite')
const deviceData = require('../models/device-data')

const logger = require('../../common/logger')

function error (res) {
  return res.status(404).json({
    brand: null,
    model: null,
    type: 'unknown'
  })
}

function respond (req, res, devices) {
  const match = melanite.match(devices)
  const device = match(decodeURIComponent(req.params.ua))
  if (device.brand === 'generic') {
    logger.warn(`Request received for unknown user-agent: ${decodeURIComponent(req.params.ua)}`)
    return error(res)
  }
  return res.json(device)
}

function identifyDeviceByUserAgent (req, res) {
  deviceData
    .fetch()
    .then((devices) => {
      const shouldUseTestData = process.env.ENVIRONMENT === 'local' || req.query.testMode
      const data = shouldUseTestData ? devices.test : devices.live
      return respond(req, res, data)
    })
    .catch((ex) => {
      logger.error(ex, decodeURIComponent(req.params.ua))
      res.status(404).json({
        brand: null,
        model: null,
        type: 'unknown'
      })
    })
}

module.exports = identifyDeviceByUserAgent
