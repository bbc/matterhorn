const request = require('../../common/request-promise')
const updateIntervalMs = 5 * 60 * 1000 // 5 minutes in milliseconds

let devices, activeRequest

function makeRequest () {
  return request.get('https://connected-tv.files.bbci.co.uk/device-identification-data/data.json')
}

function updateDeviceData () {
  activeRequest = makeRequest()
    .then(response => {
      devices = response.body
      activeRequest = null
      setInterval(updateDeviceData, updateIntervalMs)
      return devices
    })
  return activeRequest
}

function fetch () {
  if (devices) {
    return Promise.resolve(devices)
  } else {
    return activeRequest
  }
}

updateDeviceData()

module.exports = {
  fetch
}
