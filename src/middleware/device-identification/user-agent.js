const melanite = require('melanite')
const deviceData = require('./device-data')

const logger = require('../../common/logger')

function deviceError (req, res) {
  logger.warn('Request received for unknown user-agent:', req.params.ua)
  return res.status(404).json({
    brand: null,
    model: null
  })
}

function noDevicesError (req, res) {
  logger.warn('No data available for devices, unable to match user-agent:', req.params.ua)
  return res.status(404).json({
    brand: null,
    model: null
  })
}

function respond (req, res, devices) {
  if (!devices) {
    return noDevicesError(req, res)
  }
  const match = melanite.match(devices)
  const device = match(req.params.ua)
  if (!device) {
    return deviceError(req, res)
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
      logger.error(ex, req.params.ua)
      res.status(404).json({
        brand: null,
        model: null
      })
    })
}

module.exports = identifyDeviceByUserAgent
