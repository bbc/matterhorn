const request = require('../../common/request-promise')
const logger = require('../../common/logger')

let devices

function makeRequest () {
  return request.get('https://connected-tv.files.bbci.co.uk/device-identification-data/data.json')
}

setInterval(_ => {
  return makeRequest()
    .then(response => { devices = response.body })
    .catch(err => {
      logger.error('Error requesting device data', err)
    })
}, 300000)

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
      .catch(_ => next({ status: 502 }))
  }
}
