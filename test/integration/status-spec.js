const req = require('supertest')

const app = require('../../src/app')
const request = req(app.listen())

describe('Status', () => {
  it('should return a 200', (done) => {
    request.get('/status')
      .end((err, res) => {
        if (err) throw err
        expect(res.status).toBe(200)
        done()
      })
  })
})
