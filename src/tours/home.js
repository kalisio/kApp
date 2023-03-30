module.exports = [{
  target: '#left-opener',
  content: 'tours.home.SIDENAV_LABEL',
  link: 'tours.home.SIDENAV_LINK_LABEL',
  params: {
    placement: 'right',
    blockOnMiss: '#top-opener',
    hoverClickOnLink: '#left-opener',
    tour: 'home/side-nav'
  }
}, {
  target: '#top-opener',
  content: 'tours.home.TOP_PANE_LABEL',
  params: {
    placement: 'bottom',
    blockOnMiss: '#right-opener'
  }
}, {
  target: '#right-opener',
  content: 'tours.home.RIGHT_PANE_LABEL',
  params: {
    placement: 'left',
    blockOnMiss: '#bottom-opener'
  }
}, {
  target: '#bottom-opener',
  content: 'tours.home.BOTTOM_PANE_LABEL',
  params: {
    placement: 'top',
    blockOnMiss: '#fab'
  }
}, {
  target: '#fab #fab',
  content: 'tours.home.FAB_LABEL',
  params: {
    placement: 'top'
  }
}]
