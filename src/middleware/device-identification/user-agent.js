const melanite = require('melanite')

const request = require('../../common/request-promise')

function identifyDeviceByUserAgent (req, res) {
  const match = melanite.match(req.deviceData)
  return res.json(match(req.params.ua))
}

module.exports = identifyDeviceByUserAgent
