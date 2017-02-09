const whoami = require('./whoami')
const userAgent = require('./user-agent')

function deviceIdentification (req, res, next) {
  if (req.query.whoami) {
    return whoami()
      .then(data => res.json(data))
      .catch(err => next(err))
  }
  if (req.query.ua) {
    return res.json(userAgent())
  }
  res.sendStatus(404)
}

module.exports = deviceIdentification
