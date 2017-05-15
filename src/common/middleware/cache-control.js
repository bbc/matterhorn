const maxAgeInSeconds = 300

module.exports = (req, res, next) => {
  res.set('Cache-Control', `public, max-age=${maxAgeInSeconds}`)
  next()
}
