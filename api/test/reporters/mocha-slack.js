// https://github.com/mochajs/mocha/issues/812
import util from 'util'
import mocha from 'mocha'
import SlackNotifier from './slack-notifier.js'

const EVENT_RUN_BEGIN = mocha.Runner.constants.EVENT_RUN_BEGIN
const EVENT_RUN_END = mocha.Runner.constants.EVENT_RUN_END
const EVENT_SUITE_BEGIN = mocha.Runner.constants.EVENT_SUITE_BEGIN
const EVENT_SUITE_END = mocha.Runner.constants.EVENT_SUITE_END
const EVENT_TEST_PASS = mocha.Runner.constants.EVENT_TEST_PASS
const EVENT_TEST_FAIL = mocha.Runner.constants.EVENT_TEST_FAIL
const EVENT_TEST_PENDING = mocha.Runner.constants.EVENT_TEST_PENDING

function SlackReporter (runner, options) {
  mocha.reporters.Base.call(this, runner)
  const notifier = new SlackNotifier(process.env.SLACK_WEBHOOK_URL || options.reporterOptions.webhook_url)
  const context = process.env.MOCHA_CONTEXT || options.reporterOptions.context
  let startTime
  let passes = 0
  let failures = 0
  let skips = 0
  let exitCode = 0
  let messages = []

  runner.on(EVENT_RUN_BEGIN, function () {
    startTime = new Date()
    notifier.addSection(`*[${context}]* running tests ${startTime.toUTCString()}`)
  })

  runner.on(EVENT_RUN_END, async function () {
    const duration = ((new Date() - startTime) / 60).toFixed(2)
    notifier.addSection(`Duration: ${duration}s`)
    notifier.addDivider()
    notifier.notify()
    // Due to some reasons, eg https://github.com/kalisio/kdk/issues/63, tests cannot always quit
    // We force a manual exit here after a while to be sure the reporter has sent its report back
    await util.promisify(setTimeout)(5000)
    process.exit(exitCode)
  })

  runner.on(EVENT_SUITE_BEGIN, function (suite) {
    if (!suite.root) {
      console.log(`[${suite.fullTitle()}]`)
      notifier.addSection(`*[${suite.fullTitle()}]*`)
      passes = 0
      skips = 0
      failures = 0
      messages = []
    }
  })

  runner.on(EVENT_SUITE_END, function (suite) {
    if (!suite.root) {
      // On at least a failed test exit in error
      if (failures > 0) exitCode = 1
      messages.forEach(message => {
        notifier.addSection(message)
      })
      notifier.addSection(`${passes} passed, ${failures} failed, ${skips} skipped`)
    }
  })

  runner.on(EVENT_TEST_PENDING, function (test) {
    console.log('skip: %s', test.title)
    notifier.addSection(`:heavy_minus_sign:  ${test.title} skipped`)
    skips++
  })

  runner.on(EVENT_TEST_PASS, function (test) {
    console.log('pass: %s', test.title)
    notifier.addSection(`:heavy_check_mark:  ${test.title} passed`)
    passes++
  })

  runner.on(EVENT_TEST_FAIL, function (test, err) {
    console.log('fail: %s -- error: %s', test.title, err.message)
    notifier.addSection(`:x: ${test.title} failed: ${err.message}`)
    failures++
  })
};

module.exports = SlackReporter
