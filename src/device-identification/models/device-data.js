const AWS = require('aws-sdk')

const s3 = new AWS.S3({ region: 'eu-west-1' })

const updateIntervalMs = 5 * 60 * 1000 // 5 minutes in milliseconds

let devices

async function updateDeviceData () {
  console.log('updating')
  let testData = []
  let liveData = []

  try {
    const data = await s3.getObject({
      Bucket: 'test-device-identification-data-bucket-1u0gmv027tr5a',
      Key: 'device-identification-data/data.json'
    }).promise()
    testData = JSON.parse(data.Body.toString('utf-8'))
  } catch (_) { }

  if (process.env.ENVIRONMENT !== 'local') {
    try {
      liveData = s3.getObject({
        Bucket: 'live-device-identification-data-bucket-8wua42dtu3nc',
        Key: 'device-identification-data/data.json'
      }).promise()
    } catch (_) { }
  }

  console.log('updated')
  return {
    test: testData,
    live: liveData
  }
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
