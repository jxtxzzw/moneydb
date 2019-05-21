const orm = require('./utils').orm()

const Groups = orm.import('./models/Groups')

const Users = orm.import('./models/Users')

orm
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
    // console.log(orm.isDefined('User'))
    // Users.drop()
    // Groups.drop()
    // Groups.sync({force: true})
    // Users.sync({force: true})
    // console.log('Sync() succeed.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })



