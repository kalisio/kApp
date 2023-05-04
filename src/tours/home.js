module.exports = [{
  target: '#left-opener',
  content: 'tours.home.SIDENAV_LABEL',
  link: 'tours.home.SIDENAV_LINK_LABEL',
  params: {
    placement: 'right',
    clickOnLink: '#left-opener',
    tour: 'home/side-nav'
  }
}, {
  target: '#top-opener',
  content: 'tours.home.TOP_PANE_LABEL',
  params: {
    placement: 'bottom'
  }
}, {
  target: '#right-opener',
  content: 'tours.home.RIGHT_PANE_LABEL',
  params: {
    placement: 'left'
  }
}, {
  target: '#bottom-opener',
  content: 'tours.home.BOTTOM_PANE_LABEL',
  params: {
    placement: 'top'
  }
}, {
  target: '#fab #fab',
  content: 'tours.home.FAB_LABEL',
  params: {
    placement: 'top'
  }
}]
