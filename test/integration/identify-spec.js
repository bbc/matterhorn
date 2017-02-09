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
  describe('if given valid a whoami string', () => {
    it('Returns the correct device', (done) => {
      request.get('/identify/json?whoami=SNYLCD035')
      .end((err, res) => {
        if (err) throw err
        expect(res.status).toBe(200)
        expect(res.body.make).toEqual('sony')
        expect(res.body.model).toEqual('hbbtv_2013')
        done()
      })
    })
  })
})
