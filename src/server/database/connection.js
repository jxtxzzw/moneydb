const orm = require('./utils').orm()

// const Departments = orm.import('./models/Departments')
//
// const Members = orm.import('./models/Members')

const Trackings = orm.import('./models/Trackings')


orm
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
    // Trackings.sync({force: true})
    // console.log(orm.isDefined('User'))
    // Users.drop()
    // Groups.drop()
    // Groups.sync({force: true})
    // Users.sync({force: true})

    console.log('Sync() succeed.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })



