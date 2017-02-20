const request = require('../../common/request-promise')

let devices

function makeRequest() {
  request.get('https://connected-tv.files.bbci.co.uk/device-identification-data/data.json')
  .then(response => {
    devices = response.body
  })
}

setInterval(makeRequest, 300000);
makeRequest();

module.exports = function (req, res, next) {
  if (devices) {
    req.deviceData = devices
    return next()
  } else {
    return makeRequest()
  }
}
