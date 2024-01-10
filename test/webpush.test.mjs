/* eslint-disable no-unused-expressions */

import { core } from '@kalisio/kdk/test.client.js'
import { type, clickAction } from '@kalisio/kdk/test/client/core/utils.js';

const suite = 'webpush'

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

    it('webpush', async () => {
        await page.click('#left-opener')
            await page.waitForTimeout(1000)
        await page.click('#webpush')
            await page.waitForTimeout(1000)
        await type(page, '#title-field', 'Mon super titre')
        await type(page, '#body-field', 'Mon magnifique contenu')
        await type(page, '#icon-field', 'Ma fabuleuse icone')
        await type(page, '#url-field', 'Ma merveilleuse URL')
        await core.clickAction(page, 'push-btn')
            await page.waitForTimeout(1000)
    })

    it('webpush-clean', async () => {
        const cancelButtons = await page.$x('//button[contains(text(), "cancel")]'); //cible tous les boutons "cancel" de la page
        for (const cancelButton of cancelButtons) {
            await cancelButton.click();
        }
        await page.waitForTimeout(1000);
    });

    after(async () => {
        await core.logout(page)
        await runner.stop()
    })
})