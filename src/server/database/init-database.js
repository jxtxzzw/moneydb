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
    console.log('导入默认城市数据……')
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
    console.log('新建超级管理员账户……')
    const Employees = await orm.import('./models/Employees')
    await Employees.create({
      name:	'jxtxzzw',
      phone: '13000000000',
      birthday: '2019-06-08',
      salary: '123456789'
    })
      .then(async member => {
        const Members = await orm.import('./models/Members')
        await Members.update({
          email: 'admin@jxtxzzw.com',
          password: 'jxtxzzw_passwordSuffix_RgKR*%fWKi44L3Z511340d3c0c330288ba9cc2680467357a'
        }, {
          where: {
            uuid: member.uuid
          }
        })
          .then(async () => {
            const HR = await orm.import('./models/HumanResources')
            await HR.create({
              hr_id: member.uuid
            })
            const RC = await orm.import('./models/Receptionists')
            await RC.create({
              receptionist_id: member.uuid
            })
            const TP = await orm.import('./models/Transports')
            await TP.create({
              transport_id: member.uuid
            })
            const WH = await orm.import('./models/WareHouseManagers')
            await WH.create({
              manager_id: member.uuid
            })
            const DP = await orm.import('./models/Dispatchers')
            await DP.create({
              uuid: member.uuid
            })
            console.log('=====================================================')
            console.log('初始化完成，请不要再次执行该函数，否则会清空所有数据并重新建表！')
            console.log('超级管理员：admin@jxtxzzw.com，密码：jxtxzzw')
            console.log('超级管理员具有所有权限，一旦完成初始信息录入，建议立即废止账户！')
            process.exit()
          })
      })
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })






