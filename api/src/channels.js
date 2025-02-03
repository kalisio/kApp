import _ from 'lodash'

export default function (app) {
  if (typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return
  }

  app.on('connection', connection => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('anonymous').join(connection)
  })

  app.on('login', (authResult, { connection }) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection) {
      // Obtain the logged in user from the connection
      // const user = connection.user;

      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection)

      // Add it to the authenticated user channel
      app.channel('authenticated').join(connection)
    }
  })

  app.on('logout', (authResult, { connection }) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection) {
      // Obtain the logged user from the connection
      const user = connection.user
      const usersService = app.getService('users')
      usersService.logout(user)
    }
  })
  const usersService = app.getService('users')
  usersService.publish('logout', (data, hook) => {
    const user = data
    // Publish logout event to target user only
    return app.channel('authenticated').filter(connection => {
      const connectionUser = connection.user
      return user && connectionUser && connectionUser._id.toString() === user._id.toString()
    })
  })

  app.publish((data, hook) => {
    // Publish service events to authenticated users only
    return app.channel('authenticated')
  })
  
}
