const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const logger = require('./common/logger')
const userAgent = require('./middleware/device-identification/user-agent')
const whoami = require('./middleware/device-identification/whoami')

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

router.get('/identify/ua/:ua/:format', userAgent)
router.get('/identify/whoami/:whoami/:format', whoami)

router.use(require('./middleware/error-handling'))

module.exports = router
