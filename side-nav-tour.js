module.exports = [{
  target: '#logout',
  title: 'tours.home.LOGOUT_LABEL',
  content: 'tours.home.SESSION_LABEL',
  params: {
    placement: 'top',
    clickOnNext: '#left-opener',
  }
}, {
  target: '#contextual-help',
  content: 'tours.home.CONTEXT_HELP_LABEL',
  params: {
    placement: 'top',
    clickOnPrevious: '#left-opener',
    clickOnNext: '#left-opener'
  }
}, {
  target: '#about',
  content: 'tours.home.ABOUT_LABEL',
  params: {
    placement: 'top',
    clickOnPrevious: '#left-opener',
    clickOnNext: ['#left-opener', '#about'],
    nextDelay: 500
  }
}, {
  target: '#report-bug',
  content: 'tours.home.BUG_LABEL',
  params: {
    placement: 'top',
    clickOnPrevious: ['#ok-action', '#left-opener'],
    clickOnNext: '#ok-action',
    previousDelay: 500
  }
}]