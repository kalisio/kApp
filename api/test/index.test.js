import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'
import { createServer } from '../src/server.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

describe('kapp', () => {
  let server, expressServer, userService

  before(() => {
    chailint(chai, util)
  })

  it('is ES module compatible', () => {
    expect(typeof createServer).to.equal('function')
  })

  it('initialize the server', async () => {
    server = createServer()
    expressServer = await server.run()
  })
  // Let enough time to process
    .timeout(10000)

  it('registers the services', () => {
    userService = server.app.getService('users')
    expect(userService).toExist()
  })

  // Cleanup
  after(async () => {
    if (expressServer) await expressServer.close()
    fs.emptyDirSync(path.join(__dirname, 'logs'))
    await server.app.db.instance.dropDatabase()
    await server.app.db.disconnect()
  })
})
