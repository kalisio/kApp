import { core } from '@kalisio/kdk/test.client.js'

const suite = 'misc'

describe(suite, () => {
    let runner
    let page
    let user

    before(async () => {
        runner = new core.Runner(suite, {
            appName: 'kapp',
            browser: {
                args: ['--lang=fr'],
                slowMo: 2
            }
        })
        page = await runner.start()
        user = {
            email: 'kalisio@kalisio.xyz',
            password: 'Pass;word1'
        }
        await core.login(page, user)
    })

    it('misc', async () => {
        await page.click('#left-opener')
        await page.waitForTimeout(1000)
        await page.click('#miscellaneous')
        await page.waitForTimeout(1000)
        const match = await runner.captureAndMatch('misc')
        expect(match).beTrue()
    })

    after(async () => {
        await core.logout(page)
        await runner.stop()
    })
})