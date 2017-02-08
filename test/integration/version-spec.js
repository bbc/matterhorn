const req = require('supertest')

const app = require('../../src/app')
const request = req(app.listen())

describe('Version', () => {
  it('should have a valid version', (done) => {
    request.get('/version')
      .end((err, res) => {
        if (err) throw err
        expect(res.status).toBe(200)
        expect(res.body.version).toMatch(/^[0-9]+\.[0-9]+\.[0-9]+/)
        done()
      })
  })
})
