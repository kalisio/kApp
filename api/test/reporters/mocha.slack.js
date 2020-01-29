// https://github.com/mochajs/mocha/issues/812

const mocha = require('mocha')
const { IncomingWebhook } = require('@slack/webhook')

const EVENT_SUITE_BEGIN = mocha.Runner.constants.EVENT_SUITE_BEGIN
const EVENT_SUITE_END = mocha.Runner.constants.EVENT_SUITE_END
const EVENT_TEST_PASS = mocha.Runner.constants.EVENT_TEST_PASS
const EVENT_TEST_FAIL = mocha.Runner.constants.EVENT_TEST_FAIL
const EVENT_TEST_PENDING = mocha.Runner.constants.EVENT_TEST_PENDING
const EVENT_RUN_END = mocha.Runner.constants.EVENT_RUN_END

function SlackReporter (runner, options) {
  mocha.reporters.Base.call(this, runner)
  const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL || options.reporterOptions.webhook_url)
  const context = process.env.MOCHA_CONTEXT || options.reporterOptions.context
  let passes = 0
  let failures = 0
  let skips = 0
  const blocks = []
  let messages = []

  runner.on(EVENT_SUITE_BEGIN, function (suite) {
    if (!suite.root) {
      console.log('begin suite: %s', suite.fullTitle())
      passes = 0
      skips = 0
      failures = 0
      messages = []
    }
  })

  runner.on(EVENT_SUITE_END, function (suite) {
    if (!suite.root) {
      console.log('end suite: %s', suite.fullTitle())
      const icon = failures === 0 ? ':heavy_check_mark:' : ':boom:'
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `${icon} *${suite.fullTitle()}*: ${passes} passed, ${failures} failed, ${skips} skipped`
        }
      })
      messages.forEach(message => {
        blocks.push(message)
      })
    }
  })

  runner.on(EVENT_TEST_PENDING, function (test) {
    console.log('skip: %s', test.fullTitle())
    messages.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*${test.fullTitle()}* skipped`
      }
    })
    skips++
  })

  runner.on(EVENT_TEST_PASS, function (test) {
    console.log('pass: %s', test.fullTitle())
    passes++
  })

  runner.on(EVENT_TEST_FAIL, function (test, err) {
    console.log('fail: %s -- error: %s', test.fullTitle(), err.message)
    messages.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*${test.fullTitle()}* failed: ${err.message}`
      }
    })
    failures++
  })

  runner.on(EVENT_RUN_END, function () {
    console.log('end: %d/%d', passes, passes + failures)
    blocks.push({
      type: 'divider'
    })
    const message = {
      channel: '#kdk',
      text: `[${context}]`,
      blocks: blocks
    };

    (async () => { await webhook.send(message) })()
  })
};

module.exports = SlackReporter
