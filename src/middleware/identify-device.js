function identifyDeviceMiddleware (req, res, next) {
  const brandModel = {brand: 'brand', model: 'model'}
  const whoami = []

  return req.query.ua ? res.json(brandModel) : res.json(whoami)
}

module.exports = identifyDeviceMiddleware
