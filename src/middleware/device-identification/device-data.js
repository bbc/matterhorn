const request = require('../../common/request-promise')
const logger = require('../../common/logger')

let devices

function makeRequest () {
  return request.get('https://connected-tv.files.bbci.co.uk/device-identification-data/data.json')
}

function updateDeviceData () {
  return makeRequest()
    .then(response => { devices = response.body })
    .catch(err => {
      logger.error('Error requesting device data', err)
    })
}

const updateIntervalMs = 5 * 60 * 1000 // 5 minutes in milliseconds
setInterval(updateDeviceData, updateIntervalMs)

module.exports = function (req, res, next) {
  if (devices) {
    req.deviceData = devices
    return next()
  } else {
    return updateDeviceData()
      .then(response => {
        req.deviceData = devices
      })
      .then(next)
      .catch(_ => next({ status: 502 }))
  }
}
