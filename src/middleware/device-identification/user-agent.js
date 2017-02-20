const melanite = require('melanite')

function identifyDeviceByUserAgent (req, res) {
  const match = melanite.match(req.deviceData)
  const device = match(req.params.ua)
  return device ? res.json(device) : res.status(404).json({brand: null, model: null})
}

module.exports = identifyDeviceByUserAgent
