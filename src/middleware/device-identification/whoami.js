const R = require('ramda')

const request = require('../../common/request-promise')

function identifyDeviceByWhoami (whoami) {
  return request.get('https://connected-tv.files.bbci.co.uk/tvp-whoami/data/json')
    .then((body, res) => {
      const allDevices = body.body
      const matchPattern = item => new RegExp(item.who_am_i_pattern).test(whoami)
      const filterMatches = R.filter(matchPattern)
      const firstMatch = R.head
      return R.compose(firstMatch, filterMatches)(allDevices)
    })
}

module.exports = identifyDeviceByWhoami
