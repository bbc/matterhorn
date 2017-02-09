const request = require('../../common/request-promise')

function identifyDeviceByWhoami () {
  return request.get('https://connected-tv.files.bbci.co.uk/tvp-whoami/data/json')
    .then((body, res) => {
      return body.body
    })
}

module.exports = identifyDeviceByWhoami
