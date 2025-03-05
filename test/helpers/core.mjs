import makeDebug from 'debug'

const debug = makeDebug('kdk:core:test:utils')

/* Helper function to check wether an element is visible
 * see: https://github.com/puppeteer/puppeteer/issues/545
*/
export async function isElementVisible(page, selector) {
  debug(`Checking if element ${selector} is visible`)
  return page.evaluate((selector) => {
    const element = document.querySelector(selector)
    if (!element) return false
    const style = window.getComputedStyle(element)
    const visible = (style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0')
    return visible
  }, selector)
}