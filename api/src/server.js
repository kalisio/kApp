import { kalisio } from '@kalisio/kdk/core.api.js'
import fs from 'fs-extra'
import https from 'https'
import proxyMiddleware from 'http-proxy-middleware'
import express from '@feathersjs/express'

import middlewares from './middlewares.js'
import services from './services.js'
import hooks from './hooks.js'
import channels from './channels.js'

export class Server {
  constructor () {
    this.app = kalisio()
    // Serve pure static assets
    if (process.env.NODE_ENV === 'production') {
      this.app.use('/', express.static('../dist/spa'))
    }
    // In dev this is done by the webpack server

    // Define HTTP proxies to your custom API backend. See /config/index.js -> proxyTable
    // https://github.com/chimurai/http-proxy-middleware
    const proxyTable = this.app.get('proxyTable')
    Object.keys(proxyTable).forEach(context => {
      let options = proxyTable[context]
      if (typeof options === 'string') {
        options = { target: options }
      }
      this.app.use(proxyMiddleware(context, options))
    })
  }

  async run () {
    const app = this.app
    // First try to connect to DB
    await app.db.connect()
    // Set up our services
    await app.configure(services)
    // Register hooks
    app.hooks(hooks)
    // Set up real-time event channels
    app.configure(channels)
    // Configure middlewares - always has to be last
    app.configure(middlewares)

    // Last lauch server
    const httpsConfig = app.get('https')
    let expressServer
    if (httpsConfig) {
      const port = httpsConfig.port
      const server = https.createServer({
        key: fs.readFileSync(httpsConfig.key),
        cert: fs.readFileSync(httpsConfig.cert)
      }, app)
      app.logger.info('Configuring HTTPS server at port ' + port.toString())
      expressServer = await server.listen(port)
    } else {
      const port = app.get('port')
      app.logger.info('Configuring HTTP server at port ' + port.toString())
      expressServer = await app.listen(port)
    }
    return expressServer
  }
}
