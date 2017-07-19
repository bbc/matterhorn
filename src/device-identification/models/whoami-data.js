const request = require('../../common/request-promise')
const updateIntervalMs = 5 * 60 * 1000 // 5 minutes in milliseconds

let devices

function makeRequest () {
  return request.get('https://connected-tv.files.bbci.co.uk/tvp-whoami/data/json')
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
