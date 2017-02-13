const req = require('supertest')

const app = require('../../src/app')
const request = req(app.listen())

describe('Identify', () => {
  describe('if given a user agent', () => {
    it('Returns a brand and model key', (done) => {
      request.get('/identify/ua/some-user-agent/json')
        .end((err, res) => {
          if (err) throw err
          expect(res.status).toBe(200)
          expect(res.body.brand).toBeDefined()
          expect(res.body.model).toBeDefined()
          done()
        })
    })
  })
  describe('if given a valid whoami string', () => {
    it('Returns the correct device', (done) => {
      request.get('/identify/whoami/SNYLCD035/json')
        .end((err, res) => {
          if (err) throw err
          expect(res.status).toBe(200)
          expect(res.body.brand).toEqual('sony')
          expect(res.body.model).toEqual('hbbtv_2013')
          done()
        })
    })
  })
  describe('if given a valid whoami string with URI encoded characters', () => {
    it('Returns the correct device', (done) => {
      request.get('/identify/whoami/DSTPVR001%20MHGS&T271%20DSMS&T271/json')
        .end((err, res) => {
          if (err) throw err
          expect(res.status).toBe(200)
          expect(res.body.brand).toEqual('digital stream')
          expect(res.body.model).toEqual('DHR8203U')
          done()
        })
    })
  })
  describe('if given an invalid whoami string', () => {
    it('Returns an error message', (done) => {
      request.get('/identify/whoami/some-fake-device/json')
        .end((err, res) => {
          if (err) throw err
          expect(res.status).toBe(404)
          expect(res.body.error.brand).toEqual('unknown')
          expect(res.body.error.model).toEqual('unknown')
          done()
        })
    })
  })
})
