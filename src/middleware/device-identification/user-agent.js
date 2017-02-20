const melanite = require('melanite')

const stubData = require('../../../data/dummy-data.json')

function identifyDeviceByUserAgent (req, res) {
  const match = melanite.match(stubData)
  return res.json(match(req.params.ua))
}

module.exports = identifyDeviceByUserAgent
