const R = require('ramda')

const whoamiModel = require('../models/whoami-data')
const deviceCache = {}

const errorResponse = {
  error: true,
  code: 404,
  message: {
    brand: 'unknown',
    model: 'unknown'
  }
}

function sendResponse (res, device) {
  res.setHeader('x-matterhorn-whoami-device', JSON.stringify(device))
  res.json({
    brand: device.brand,
    model: device.model
  })
}

function identifyDeviceByWhoami (req, res, next) {
  const whoami = req.params.whoami
  if (deviceCache[whoami]) {
    return sendResponse(res, deviceCache[whoami])
  }

  return whoamiModel.fetch()
    .then((allDevices) => {
      const matchPattern = item => new RegExp(item.who_am_i_pattern).test(whoami)
      const filterMatches = R.filter(matchPattern)
      const firstMatch = R.head
      const device = R.compose(firstMatch, filterMatches)(allDevices)
      if (device) {
        deviceCache[whoami] = device
        return sendResponse(res, deviceCache[whoami])
      }
      return next(errorResponse)
    })
}

module.exports = identifyDeviceByWhoami
