const whoami = require('./whoami')
const userAgent = require('./user-agent')

function deviceIdentification (req, res) {
  if (req.query.whoami) {
    return res.json(whoami())
  }
  if (req.query.ua) {
    return res.json(userAgent())
  }
  res.sendStatus(404)
}

module.exports = deviceIdentification
