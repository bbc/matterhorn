const flashheart = require('flashheart')
const logger = require('./logger')

const requestDefaults = { json: true, time: true }
const request = require('request').defaults(requestDefaults)

const client = flashheart.createClient({ request, logger, timeout: 5000 })

module.exports = {
  get: client.get.bind(client),
  put: client.put.bind(client),
  post: client.post.bind(client),
  patch: client.patch.bind(client),
  delete: client.delete.bind(client)
}
