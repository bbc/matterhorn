const melanite = require('melanite')
const deviceData = require('../models/device-data')

const logger = require('../../common/logger')
const logResponseTime = require('../../common/log-response-time')

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
    logger.warn(`Request received for unknown user-agent: ${req.params.ua}`)
    return error(res)
  }
  return res.json(device)
}

function identifyDeviceByUserAgent (req, res) {
  const startTime = Date.now()
  deviceData
    .fetch()
    .then((devices) => {
      logResponseTime(startTime)
      return respond(req, res, devices)
    })
    .catch((ex) => {
      logResponseTime(startTime)
      logger.error(ex, req.params.ua)
      res.status(404).json({
        brand: null,
        model: null,
        type: 'unknown'
      })
    })
}

module.exports = identifyDeviceByUserAgent
