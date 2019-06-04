const orm = require('./utils').orm()

// const Departments = orm.import('./models/Departments')
//
// const Members = orm.import('./models/Members')

// const Trackings = orm.import('./models/Trackings')
const Locations = orm.import('./models/Locations')
const WareHouses = orm.import('./models/WareHouses')
const Packages = orm.import('./models/Packages')

orm
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
    // Trackings.sync({force: true})
    // Locations.sync({force: true})
    // console.log(orm.isDefined('User'))
    // Users.drop()
    // Groups.drop()
    // Packages.sync({force: true})
    // WareHouses.sync({force: true})
    console.log('Sync() succeed.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
