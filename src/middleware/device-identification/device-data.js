const request = require('../../common/request-promise')

let devices

function makeRequest() {
  return request.get('https://connected-tv.files.bbci.co.uk/device-identification-data/data.json')
    .then(response => {
      devices = response.body
      req.deviceData = devices
      return next()
    })
}
setTimeout(makeRequest, 5000)

module.exports = function (req, res, next) {
  if (devices) {
    req.deviceData = devices
    return next()
  } else {
    return makeRequest()
  }
}
