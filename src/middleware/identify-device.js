function identifyDeviceMiddleware (req, res, next) {
  return res.json({
    brand: 'brand',
    model: 'model'
  })
}

module.exports = identifyDeviceMiddleware
