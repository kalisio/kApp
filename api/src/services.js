import _ from 'lodash'
import path from 'path'
import kCore from '@kalisio/kdk/core.api'
import packageInfo from '../../package.json'

module.exports = async function () {
  const app = this

  // Set up our plugin services
  try {
    app.use(app.get('apiPath') + '/capabilities', (req, res, next) => {
      const response = {
        name: 'kapp',
        domain: app.get('domain'),
        version: packageInfo.version
      }
      if (process.env.BUILD_NUMBER) {
        response.buildNumber = process.env.BUILD_NUMBER
      }
      res.json(response)
    })
    await app.configure(kCore)
  } catch (error) {
    app.logger.error(error.message)
  }

  // Create a service
  app.createService('documents', {
    servicesPath: '',
    modelsPath: path.join(__dirname, 'models')
  })

  // Create the default user
  const usersService = app.getService('users')
  const defaultUsers = app.get('authentication').defaultUsers
  // Do not use exposed passwords on staging/prod environments
  if (defaultUsers && !process.env.NODE_APP_INSTANCE) {
    // Create default users if not already done
    const users = await usersService.find({ paginate: false })
    for (let i = 0; i < defaultUsers.length; i++) {
      const defaultUser = defaultUsers[i]
      const createdUser = _.find(users, user => user.email === defaultUser.email)
      if (!createdUser) {
        app.logger.info('Initializing default user (email = ' + defaultUser.email + ', password = ' + defaultUser.password + ')')
        await usersService.create(defaultUser)
      }
    }
  }
}
