const AWS = require('aws-sdk')

const s3 = new AWS.S3({ region: 'eu-west-1' })

const updateIntervalMs = 5 * 60 * 1000 // 5 minutes in milliseconds

let devices

async function updateDeviceData () {
  let testData = []
  let liveData = []

  try {
    const data = await s3.getObject({
      Bucket: 'test-device-identification-data-bucket-1u0gmv027tr5a',
      Key: 'device-identification-data/data.json'
    }).promise()
    testData = JSON.parse(data.Body.toString('utf-8'))
  } catch (ex) {
    console.error('error fetching test data', ex)
  }

  if (process.env.ENVIRONMENT !== 'local') {
    try {
      const data = s3.getObject({
        Bucket: 'live-device-identification-data-bucket-8wua42dtu3nc',
        Key: 'device-identification-data/data.json'
      }).promise()
      liveData = JSON.parse(data.Body.toString('utf-8'))
    } catch (ex) {
      console.error('error fetching live data', ex)
    }
  }

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
