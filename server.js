const app = require('./src/app')
const logger = require('./src/common/logger')

const { port = 8080 } = require('minimist')(process.argv.slice(2))

app.listen(port, (req, res) => {
  logger.info(`[TAF-SERVICE-MATTERHORN] listening at http://localhost:${port}`)
})
