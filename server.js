const cluster = require('cluster')
const os = require('os')

const app = require('./src/app')
const logger = require('./src/common/logger')

const { port = 8080 } = require('minimist')(process.argv.slice(2))

if (cluster.isMaster) {
  os.cpus().map(() => cluster.fork())

  cluster.on('online', worker => logger.info(`Worker ${worker.id} started`))

  cluster.on('exit', worker => {
    cluster.fork()
    return logger.error(`Worker ${worker.id} died`)
  })
} else {
  app.listen(port, (req, res) => {
    logger.info(`[MATTERHORN] listening at http://localhost:${port}`)
  })
}
