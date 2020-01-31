const { IncomingWebhook } = require('@slack/webhook')

class SlackNotifier {
  constructor (slack_webook_url) {
    this.webhook = new IncomingWebhook(slack_webook_url)
    this.blocks = []
  }

  addSection (text) {
    this.blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text
      }
    })
    return { }
  }

  addDivider () {
    this.blocks.push({
      type: 'divider'
    })
  }

  async notify (text) {
    await this.webhook.send({
      text,
      blocks: this.blocks
    })
    this.blocks = []
  }
}

module.exports = SlackNotifier
