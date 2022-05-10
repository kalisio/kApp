import _ from 'lodash'

function loadComponent (component) {
  return () => { 
    return import(`@kalisio/kdk/core/client/components/${component}.vue`)
      .catch(errorCore => {
        // Otherwise this should be app component
        return import(`@components/${component}.vue`)
          .catch(errorApp => {
            console.log(errorCore, errorApp)
          })
      })
  }
}

function loadSchema (schema) {
  return import(`@kalisio/kdk/core/common/schemas/${schema}.json`)
    .catch(errorCore => {
      // Otherwise this should be app component
      return import(`./schemas/${schema}.json`)
        .catch(errorApp => {
          console.log(errorCore, errorApp)
        })
    })
}

function resolveAsset (asset) {
  return require('./assets/' + asset)
}

// We need this so that we can dynamically load the components
// with a function that has previously been statically analyzed by the bundler (eg webpack)
function load (name, type = 'component') {
  switch (type) {
    case 'asset':
      return resolveAsset(name)
    case 'schema':
      return loadSchema(name)
    case 'component':
    default:
      return loadComponent(name)
  }
}

const utils = {
  loadComponent,
  loadSchema,
  resolveAsset,
  load
}

export default utils
