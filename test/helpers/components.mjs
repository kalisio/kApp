import makeDebug from 'debug'

const debug = makeDebug('kdk:core:test:utils')

// Function specific to kApp -> Components Activity -> Time mode
export async function isSliderDisabled(page) {
  debug(`Checking if slider is disabled`)
  return page.evaluate(() => {
    const slider = document.querySelector('.q-range')
    if (!slider || !slider.ariaDisabled) return false
    return slider.ariaDisabled === 'true'
  })
}