const request = require('./request')

const promise = function configurePromise (method) {
  return function requestPromise (...args) {
    return new Promise((resolve, reject) => {
      const callback = (err, body, res) => {
        if (err) return reject({ err, body, res })

        return resolve({ body, res })
      }

      method(...args, callback)
    })
  }
}

module.exports = {
  get: promise(request.get),
  put: promise(request.put),
  post: promise(request.post),
  patch: promise(request.patch),
  delete: promise(request.delete)
}
