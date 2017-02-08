const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const logger = require('./common/logger')
const identifyDevice = require('./middleware/identify-device')

const { name, version } = require('../package')

const router = express.Router()

router.use(cors())
router.use(morgan('short', { stream: logger.stream }))

router.get('/status', (req, res) => {
  res.send('matterhorn is working fine')
})

router.get('/version', (req, res) => {
  res.json({ version, name })
})

router.get('/identify/:format', identifyDevice)

router.use(require('./middleware/error-handling'))

module.exports = router
