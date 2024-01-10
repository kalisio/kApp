/* eslint-disable no-unused-expressions */

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
        /*//pour effectuer un screenshot qui remplace le précédent
        wait page.screenshot({
            path: 'test/data/misc/screenrefs/misc.png',
            fullPage: true*/
        //pour effectuer un screenshot qui vient s'ajouter à ceux existants
        const timestamp = new Date().toISOString().replace(/:/g, '-')
        const screenshotPath = `test/data/misc/screenrefs/misc_${timestamp}.png`
        await page.screenshot({ 
            path: screenshotPath,
            fullPage: true });
    })

    after(async () => {
        await core.logout(page)
        await runner.stop()
    })
})