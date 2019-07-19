import _ from 'lodash'

function loadComponent (component) {
  return () => {
    return import(`@kalisio/kdk-core/lib/client/components/${component}.vue`)
      .catch(errorCore => {
        // Otherwise this should be app component
        return import(`@/${component}.vue`)
          .catch(errorApp => {
            console.log(errorCore, errorApp)
          })
      })
  }
}

function loadSchema (schema) {

  return new Promise(function (resolve, reject) {
    try {
      const json = require(`@kalisio/kdk-core/lib/common/schemas/${schema}.json`)
      return resolve(json)
    } catch (errorCore) {

      try {
        const json = require(`./schemas/${schema}.json`)
        return resolve(json)
      } catch (errorApp) {
        console.log(errorCore, errorApp)
        return reject(errorApp)
      }
    }
  })
}

function loadTranslation (module, locale) {
  let translation = module + '_' + locale + '.json'
  return import(`@kalisio/kdk-core/lib/client/i18n/${translation}`)
    .catch(errorCore => {
      return import(`./i18n/${translation}`)
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

function buildRoutes (config) {
  function buildRoutesRecursively (config, routes, parentRoute) {
    _.forOwn(config, (value, key) => {
      // The key is always the path for the route
      let route = {
        path: key,
        name: key,
        // "Inherit" meta data on nested routes
        meta: (parentRoute ? Object.assign({}, parentRoute.meta) : {})
      }
      // If value is a simple string this is a shortcut:
      // - name = path
      // - component = value
      // Otherwise we have an object similar to what expect vue-router,
      // we simply return the async component loading function with the given component value
      if (typeof value === 'string') {
        route.component = loadComponent(value)
      } else {
        // Take care that path can be empty so we cannot just check with a if
        if (_.has(value, 'path')) {
          route.path = value.path
        }
        // Take care that name can be empty so we cannot just check with a if
        if (_.has(value, 'name')) {
          route.name = value.name
        }
        if (_.has(value, 'component')) {
          route.component = loadComponent(value.component)
        }
        if (_.has(value, 'props')) {
          route.props = value.props
        }
        if (_.has(value, 'meta')) {
          // Override parent meta if child meta given
          Object.assign(route.meta, value.meta)
        }
        if (_.has(value, 'redirect')) {
          _.set(route, 'redirect', value.redirect)
        }
      }

      // Check for any children to recurse
      if (value.children) {
        route.children = []
        buildRoutesRecursively(value.children, route.children, route)
      }
      routes.push(route)
    })
  }

  let routes = []
  buildRoutesRecursively(config, routes)
  return routes
}

let utils = {
  loadComponent,
  loadSchema,
  loadTranslation,
  resolveAsset,
  load,
  buildRoutes
}

export default utils
