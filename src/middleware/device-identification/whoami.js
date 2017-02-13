const R = require('ramda')

const request = require('../../common/request-promise')
const deviceCache = {}

const errorResponse = {
  error: true,
  code: 404,
  message: {
    brand: 'unknown',
    model: 'unknown'
  }
}

function identifyDeviceByWhoami (req, res, next) {
  const whoami = req.params.whoami
  if (deviceCache[whoami]) return res.json(deviceCache[whoami])
  return request.get('https://connected-tv.files.bbci.co.uk/tvp-whoami/data/json')
    .then((body) => {
      const allDevices = body.body
      const matchPattern = item => new RegExp(item.who_am_i_pattern).test(whoami)
      const filterMatches = R.filter(matchPattern)
      const firstMatch = R.head
      const device = R.compose(firstMatch, filterMatches)(allDevices)
      if (device) {
        deviceCache[whoami] = device
        return res.json({
          brand: device.brand,
          model: device.model
        })
      }
      return next(errorResponse)
    })
}

module.exports = identifyDeviceByWhoami
