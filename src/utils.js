import _ from 'lodash'

function buildTours(config) {
  function buildToursRecursively(config, tours) {
    _.forOwn(config, (value, key) => {
      const name = _.get(value, 'name', _.get(value, 'path', key))
      const tour = _.get(value, 'tour')
      if (tour) {
        // If we directly have a tour as an array of steps
        if (Array.isArray(tour)) tours[name] = tour
        // Or a set of tours as key/value object when eg the route has a parameter and each value has its own tour
        // or when the tour is split over multiple linked smaller tours because it is too much complex for a single one
        else if (typeof tour === 'object') {
          _.forOwn(tour, (paramTour, paramValue) => {
            // We identify the main route tour if the key is the same
            if (paramValue === name) tours[`${name}`] = paramTour
            else tours[`${name}/${paramValue}`] = paramTour
          })
        }
      }
      // Check for any children to recurse
      if (value.children) {
        buildToursRecursively(value.children, tours)
      }
    })
  }

  const tours = {}
  buildToursRecursively(config, tours)
  return tours
}

export function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

const utils = {
  buildTours,
  escapeHtml
}

export default utils