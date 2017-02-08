const Jasmine = require('jasmine')
const SpecReporter = require('jasmine-spec-reporter').SpecReporter

const displaySuccessfulSpec = !!process.env.VERBOSE

module.exports = function () {
  const jrunner = new Jasmine()

  jrunner.configureDefaultReporter({ print: () => {} })
  jasmine.getEnv().clearReporters()
  jrunner.addReporter(new SpecReporter({ displaySuccessfulSpec }))

  return jrunner
}
