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
      return respond(req, res, devices)
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
