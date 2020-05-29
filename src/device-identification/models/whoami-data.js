const AWS = require('aws-sdk')

const s3 = new AWS.S3({ region: 'eu-west-1' })

const updateIntervalMs = 5 * 60 * 1000 // 5 minutes in milliseconds

let devices

async function updateDeviceData () {
  let testData = []
  let liveData = []

  try {
    const data = await s3.getObject({
      Bucket: 'test-tvp-whoami-bucket-1npt44dhbyabk',
      Key: 'brand-and-model.json'
    }).promise()
    testData = JSON.parse(data.Body.toString('utf-8'))
  } catch (ex) {
    console.error('error fetching test data', ex)
  }

  if (process.env.ENVIRONMENT !== 'local') {
    try {
      const data = await s3.getObject({
        Bucket: 'live-tvp-whoami-bucket-16yjbiw80xn5q',
        Key: 'brand-and-model.json'
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
