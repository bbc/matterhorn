const createRunner = require('./create-runner')
const jrunner = createRunner()

jrunner.loadConfig({
  spec_dir: 'test/spec',
  spec_files: [
    '**/*spec.js'
  ],
  helpers: [
    '../helpers/**/*.js'
  ]
})

jrunner.execute()
