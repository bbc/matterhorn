const request = require('../../common/request-promise')

let devices

function makeRequest() {
  return request.get('https://connected-tv.files.bbci.co.uk/device-identification-data/data.json')
}

setInterval(_ => makeRequest().then(response => devices = response.body), 300000);

module.exports = function (req, res, next) {
  if (devices) {
    req.deviceData = devices
    return next()
  } else {
    return makeRequest()
      .then(response => {
        devices = response.body
        req.deviceData = devices
        return next()
      })
  }
}
