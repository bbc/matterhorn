const winston = require('winston')
const split = require('split')

const { LOG_PATH } = process.env
const transports = []

const fileConfig = (name, logFile) => ({ name, level: name, filename: `${LOG_PATH}/${logFile}` })

if (LOG_PATH) {
  transports.push(new winston.transports.File(fileConfig('info', 'output.log')))
  transports.push(new winston.transports.File(fileConfig('error', 'error.log')))
} else {
  transports.push(new winston.transports.Console({colorize: true, json: false, handleExceptions: true}))
}

const logger = new winston.Logger({ transports })

module.exports = logger
module.exports.stream = split().on('data', logger.info)
