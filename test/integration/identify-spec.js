const req = require('supertest')

const app = require('../../src/app')
const request = req(app.listen())

describe('Identify', () => {
  describe('if given a valid user agent', () => {
    it('Returns the correct device', (done) => {
      request.get('/identify/ua/Mozilla%2F5.0%20(Macintosh%3B%20Intel%20Mac%20OS%20X%2010_11_6)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F56.0.2924.87%20Safari%2F537.36/json')
        .end((err, res) => {
          if (err) throw err
          expect(res.status).toBe(200)
          expect(res.body.brand).toEqual('google')
          expect(res.body.model).toEqual('chrome')
          expect(res.body.type).toEqual('unknown')
          done()
        })

      request.get('/identify/ua/smarttv_AFTS_Build_565189620_Chromium_34.0.1847.114/json')
        .end((err, res) => {
          if (err) throw err
          expect(res.status).toBe(200)
          expect(res.body.brand).toEqual('amazon')
          expect(res.body.model).toEqual('firetv_2015')
          expect(res.body.type).toEqual('tv')
          done()
        })
    })
    it('Contains the expected cache headers', (done) => {
      request.get('/identify/ua/smarttv_AFTS_Build_565189620_Chromium_34.0.1847.114/json')
        .end((err, res) => {
          if (err) throw err
          expect(res.status).toBe(200)
          expect(res.headers['cache-control']).toEqual('public, max-age=300')
          done()
        })
    })
  })
  describe('if given an invalid user agent', () => {
    it('Returns an error message', (done) => {
      request.get('/identify/ua/some-fake-user-agent/json')
        .end((err, res) => {
          if (err) throw err
          expect(res.status).toBe(404)
          expect(res.body.brand).toEqual(null)
          expect(res.body.model).toEqual(null)
          expect(res.body.type).toEqual('unknown')
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
    it('Contains the expected cache headers', (done) => {
      request.get('/identify/whoami/SNYLCD035/json')
        .end((err, res) => {
          if (err) throw err
          expect(res.status).toBe(200)
          expect(res.headers['cache-control']).toEqual('public, max-age=300')
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
          expect(res.body.brand).toEqual('digital_stream')
          expect(res.body.model).toEqual('dhr8203u')
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
