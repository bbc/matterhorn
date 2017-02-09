const R = require('ramda')

const request = require('../../common/request-promise')
const deviceCache = {}

function identifyDeviceByWhoami (whoami) {
  return new Promise((resolve, reject) => {
    if (deviceCache[whoami]) return resolve(deviceCache[whoami])
    return request.get('https://connected-tv.files.bbci.co.uk/tvp-whoami/data/json')
      .then((body, res) => {
        const error = {
          error: true,
          code: 404,
          message: {
            make: 'unknown',
            model: 'unknown'
          }
        }
        const allDevices = body.body
        const matchPattern = item => new RegExp(item.who_am_i_pattern).test(whoami)
        const filterMatches = R.filter(matchPattern)
        const firstMatch = R.head
        const device = R.compose(firstMatch, filterMatches)(allDevices)
        if (device) {
          deviceCache[whoami] = device
          return resolve(device)
        }
        return reject(error)
      })
  })
}

module.exports = identifyDeviceByWhoami
