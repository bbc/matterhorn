const request = require('../../common/request-promise')
const updateIntervalMs = 5 * 60 * 1000 // 5 minutes in milliseconds

let devices

function makeRequest () {
  return request.get('https://device-identification-data-wargame.s3.amazonaws.com/device-identification-data.json')
}

function updateDeviceData () {
  return makeRequest()
    .then(response => {
      devices = response.body
      return devices
    })
}

function fetch () {
  if (devices) {
    return Promise.resolve(devices)
  } else {
    return updateDeviceData()
  }
}

setInterval(updateDeviceData, updateIntervalMs)

module.exports = {
  fetch
}
