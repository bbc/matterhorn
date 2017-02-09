const req = require('supertest')

const app = require('../../src/app')
const request = req(app.listen())

describe('Identify', () => {
  describe('if given a user agent', () => {
    it('Returns a brand and model key', (done) => {
      request.get('/identify/json?ua=some-user-agent')
        .end((err, res) => {
          if (err) throw err
          expect(res.status).toBe(200)
          expect(res.body.brand).toBeDefined()
          expect(res.body.model).toBeDefined()
          done()
        })
    })
  })
  describe('if given a whoami string', () => {
    it('Returns all known whoami devices', (done) => {
      request.get('/identify/json?whoami=some-whoami-string')
      .end((err, res) => {
        if (err) throw err
        expect(res.status).toBe(200)
        expect(Array.isArray(res.body)).toEqual(true)
        done()
      })
    })
  })
})
