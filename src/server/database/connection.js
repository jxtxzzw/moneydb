const orm = require('./utils').orm()

const MODEL_INIT_LIST = [
  // 'Locations',
  'HumanResources',
  'Transports',
  'Receptionists',
  // 'WareHouseManagers',
  // 'Members',
  // 'Employees',
  // 'Trackings',
  // 'Packages'
]

const MODELS = []

for (const x of MODEL_INIT_LIST) {
  MODELS.push(orm.import('./models/' + x))
}


function forceSyncModels(MODELS) {
  for (const model of MODELS) {
    model.sync({force: true})
  }
}

orm
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
    forceSyncModels(MODELS)
    console.log('Sync() succeed.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
