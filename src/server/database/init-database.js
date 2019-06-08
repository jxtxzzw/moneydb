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

async function forceSyncModels(MODELS) {
  for (const model of MODELS.reverse()) {
    await model.sync({force: true})
  }
}

async function forceDropModels(MODELS) {
  for (const model of MODELS.reverse()) {
    await model.drop()
  }
}

orm
  .authenticate()
  .then(async () => {
    console.log('Connection has been established successfully.')
    await forceDropModels(MODELS)
    await forceSyncModels(MODELS) // 坑：reverse 是作用在原数组上的，不是搞了个新的返回
    console.log('Sync() succeed.')
    const Locations = await orm.import('./models/Locations')
    await Locations.create({location: '上海', father: null})
    await Locations.create({location: '宝山', father: '上海'})
    await Locations.create({location: '闵行', father: '上海'})
    await Locations.create({location: '普陀', father: '上海'})
    await Locations.create({location: '虹口', father: '上海'})
    await Locations.create({location: '静安', father: '上海'})
    await Locations.create({location: '华东师范大学', father: '普陀'})
    await Locations.create({location: '环球港', father: '普陀'})
    await Locations.create({location: '浙江', father: null})
    await Locations.create({location: '杭州', father: '浙江'})
    await Locations.create({location: '北京', father: null})
    console.log('初始化完成，请不要再次执行该函数，否则会清空所有数据并重新建表！')
    process.exit()
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })






