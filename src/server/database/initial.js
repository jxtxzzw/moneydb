const orm = require('./utils').orm()

const MODEL_INIT_LIST = [
  // 'Dispatchers',
  // 'DispatcherPairs',
  // 'Employees',
  // 'Receptionists',
  // 'WareHouseManagers',
  // 'Members',
  // 'Employees',
  // 'HumanResources',
  // 'Packages',
  // 'WareHouses',
  // 'Transports',
  // 'Locations',
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

function forceDropModels(MODELS) {

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

// const Locations = orm.import('./models/Locations')
// Locations.create({location: '上海', father: null})
// Locations.create({location: '宝山', father: '上海'})
// Locations.create({location: '闵行', father: '上海'})
// Locations.create({location: '普陀', father: '上海'})
// Locations.create({location: '虹口', father: '上海'})
// Locations.create({location: '静安', father: '上海'})
// Locations.create({location: '华东师范大学', father: '普陀'})
// Locations.create({location: '环球港', father: '普陀'})
// Locations.create({location: '浙江', father: null})
// Locations.create({location: '杭州', father: '浙江'})
// Locations.create({location: '北京', father: null})
