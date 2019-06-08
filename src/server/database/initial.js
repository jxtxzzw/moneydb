const orm = require('./utils').orm()

const MODEL_INIT_LIST = [
  'Dispatchers',
  'DispatcherPairs',
  'Employees',
  'Receptionists',
  'WareHouseManagers',
  'Members',
  'Employees',
  'HumanResources',
  'Packages',
  'WareHouses',
  'Transports',
  'Locations',
  'Permissions',
  'MemberPermissions'
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

const Permissions = orm.import('./models/Permissions')
Permissions.create({api: '/Dispatcher/Info' })
Permissions.create({api: '/DispatchPair/Count' })
Permissions.create({api: '/DispatchPair/Query' })
Permissions.create({api: '/DispatchPair/Rate' })
Permissions.create({api: '/DispatchPair/ChangeRate' })
Permissions.create({api: '/DispatchPair/Done' })
Permissions.create({api: '/Employee/Count' })
Permissions.create({api: '/Employee/Max' })
Permissions.create({api: '/Employee/Add' })
Permissions.create({api: '/Employee/Query' })
Permissions.create({api: '/Employee/EmailUnique' })
Permissions.create({api: '/Employee/Privilege' })
Permissions.create({api: '/Employee/Delete' })
Permissions.create({api: '/Location/Query' })
Permissions.create({api: '/Package/Count' })
Permissions.create({api: '/Package/Max' })
Permissions.create({api: '/Package/Add' })
Permissions.create({api: '/Package/Tracking' })
Permissions.create({api: '/Package/Checkpoint' })
Permissions.create({api: '/Package/Query' })
Permissions.create({api: '/Package/Delete' })
Permissions.create({api: '/User/Auth' })
Permissions.create({api: '/User/Login' })
Permissions.create({api: '/User/ChangePassword' })
Permissions.create({api: '/User/ResetPassword' })
Permissions.create({api: '/User/Email' })
Permissions.create({api: '/UserQuery/Query' })
Permissions.create({api: '/UserQuery/Count' })
Permissions.create({api: '/WareHouse/Count' })
Permissions.create({api: '/WareHouse/Max' })
Permissions.create({api: '/WareHouse/Add' })
Permissions.create({api: '/WareHouse/Query' })
Permissions.create({api: '/WareHouse/ManagerList' })
Permissions.create({api: '/WareHouse/Delete' })

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
