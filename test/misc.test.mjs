import { core } from '@kalisio/kdk/test.client.js'
import { strict as assert } from 'assert'

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
        /*//Capture écran qui remplace la précédente
        wait page.screenshot({
            path: 'test/data/misc/screenrefs/misc.png'*/
        //Capture écran qui vient s'ajouter à celles existantes
        const timestamp = new Date().toISOString().replace(/:/g, '-')
        const screenshotPath = `test/data/misc/screenrefs/misc_${timestamp}.png`
        await page.screenshot({
            path: screenshotPath
        })
            await page.waitForTimeout(1000)

        // Comparaison avec la capture d'écran de référence
        const match = await runner.captureAndMatch('misc')
        assert.strictEqual(match, true, 'La capture d\'écran ne correspond pas à la référence.')
    })

    after(async () => {
        await core.logout(page)
        await runner.stop()
    })
})