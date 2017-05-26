const R = require('ramda')

const request = require('../../common/request-promise')
const logResponseTime = require('../../common/log-response-time')

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
  const startTime = Date.now()

  const whoami = req.params.whoami
  if (deviceCache[whoami]) {
    return sendResponse(res, deviceCache[whoami])
  }

  return request.get('https://connected-tv.files.bbci.co.uk/tvp-whoami/data/json')
    .then((body) => {
      const allDevices = body.body
      const matchPattern = item => new RegExp(item.who_am_i_pattern).test(whoami)
      const filterMatches = R.filter(matchPattern)
      const firstMatch = R.head
      const device = R.compose(firstMatch, filterMatches)(allDevices)

      if (device) {
        deviceCache[whoami] = device
        logResponseTime(startTime)
        return sendResponse(res, deviceCache[whoami])
      }

      logResponseTime(startTime)
      return next(errorResponse)
    })
}

module.exports = identifyDeviceByWhoami
