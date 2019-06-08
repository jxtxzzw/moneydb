const orm = require('./utils').orm()

const MODEL_INIT_LIST = [
  'Locations',
  'Employees',
  'Members',
  'Dispatchers',
  'Receptionists',
  'WareHouseManagers',
  'HumanResources',
  'Transports',
  'WareHouses',
  'Packages',
  'DispatchPairs',
  'Trackings',
  'PackageReceptionists'
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
  for (const model of MODELS.reverse()) {
    model.drop()
  }
}

orm
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
    forceDropModels(MODELS)
    forceSyncModels(MODELS)
    console.log('Sync() succeed.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

const Locations = orm.import('./models/Locations')
Locations.create({location: '上海', father: null})
Locations.create({location: '宝山', father: '上海'})
Locations.create({location: '闵行', father: '上海'})
Locations.create({location: '普陀', father: '上海'})
Locations.create({location: '虹口', father: '上海'})
Locations.create({location: '静安', father: '上海'})
Locations.create({location: '华东师范大学', father: '普陀'})
Locations.create({location: '环球港', father: '普陀'})
Locations.create({location: '浙江', father: null})
Locations.create({location: '杭州', father: '浙江'})
Locations.create({location: '北京', father: null})
