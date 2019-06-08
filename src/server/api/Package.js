const express = require('express')
const router = express.Router()

const orm = require('../database/utils').orm()

const jwt_decode = require('express-jwt')
const {secretKey} = require('../router/salt')

const Packages = orm.import('../database/models/Packages')
const WareHouses = orm.import('../database/models/WareHouses')

router.post('/Package/Count', jwt_decode({
  secret: secretKey
}), async (request, response) => {
  await Packages.count().then(count => {
    response.json({
      count: count
    })
  })
})

router.post('/Package/Max', jwt_decode({
  secret: secretKey
}), async (request, response) => {
  await Packages.count().then(async count => {
    if (count === 0) {
      response.json({
        max: 0
      })
    } else {
      await Packages.max('package_id').then(max => {
        response.json({
          max: max
        })
      })
    }
  })
})

const Receptionists = orm.import('../database/models/Receptionists')
router.post('/Package/Add', jwt_decode({
  secret: secretKey
}),async (request, response) => {
  await Receptionists.findOne({
    where: {
      receptionist_id: request.user.uuid
    }
  })
    .then(async auth => {
      if (auth != null) {
        const payload = request.body
        payload.sender_city = payload.sender_city[payload.sender_city.length - 1]
        payload.receiver_city = payload.receiver_city[payload.receiver_city.length - 1]
        await Packages.findOne({
          where: {
            package_id: payload.package_id
          }
        })
          .then(async project => {
            if (!project) {
              let inSequence = false
              await Packages.count().then(async count => {
                await Packages.max('package_id').then(async max => {
                  inSequence = ((count === 0 && payload.package_id === 1) || payload.package_id === max + 1)
                  if (inSequence) {
                    payload.status = '已揽件'
                    await Packages.create(payload)
                      .then(async () => {
                        const PackageReceptionists = orm.import('../database/models/PackageReceptionists')
                        await PackageReceptionists.findOrCreate({
                          where: {
                            package_id: payload.package_id,
                            receptionist_id: request.user.uuid
                          }
                        }).then(() => {
                          response.sendStatus(200)
                        })
                      })
                  } else {
                    response.sendStatus(403)
                  }
                })
              })
            } else {
              await Packages.update(payload,{
                where: {
                  package_id: payload.package_id
                }
              }).then( () => {
                  response.sendStatus(200)
                }
              )
                .catch( () => {
                  response.sendStatus(406)
                })
            }
          })
      } else {
        response.sendStatus(403)
      }
    })
})

const Trackings = orm.import('../database/models/Trackings')
router.post('/Package/Tracking', async (request, response) => {
  const params = request.body
  await Packages.findAll({
    where: params,
    attributes: ['status']
  })
    .then(async statusProject => {
      if (statusProject.length === 0) {
        response.json({
          status: 'NOT FOUND'
        })
      } else {
        const status = statusProject[0].status
        await Trackings.findAll({
          where: params,
          attributes: ['action', 'warehouse_id', 'transport_id', 'date'],
          order: [['date', 'DESC']],
          include:
            {
              model: WareHouses,
              attributes: ['warehouse_name']
            }
        })
          .then(trackingProject => {
            response.json({
              status: status,
              tracking: trackingProject
            })
          })
      }
    })
})

const Transports = orm.import('../database/models/Transports')
router.post('/Package/Checkpoint', async (request, response) => {
  await Transports.findOne({
    where: {
      transport_id: request.user.uuid
    }
  })
    .then(async auth => {
      if (auth != null) {
        const params = request.body
        await WareHouses.findOne({
          where: {
            warehouse_name: params.warehouse_name
          },
          attributes: ['warehouse_id']
        })
          .then(async warehouse => {
            const warehouse_id = warehouse.get('warehouse_id')
            await Trackings.create({
              action: params.action,
              date: Date.now(),
              package_id: params.package_id,
              warehouse_id: warehouse_id,
              transport_id: request.user.uuid
            }).then(async () => {
              await Packages.update({
                status: '运输中'
              }, {
                where: {
                  package_id: params.package_id
                }
              })
                // 只要有物流信息了，就自动进入运输中这一状态
                .then(async () => {
                  await Packages.findOne({
                    where: {
                      package_id: params.package_id
                    },
                    attributes: ['receiver_city']
                  })
                    .then(async city1Project => {
                      const city1 = city1Project.get('receiver_city')
                      await WareHouses.findOne({
                        where: {
                          warehouse_id: warehouse_id
                        },
                        attributes: ['location']
                      })
                        .then(async city2Project => {
                          const city2 = city2Project.get('location')
                          if (city1 === city2) {
                            await Packages.update({
                              status: '派件中'
                            }, {
                              where: {
                                package_id: params.package_id
                              }
                            })
                            // 如果当前城市和收件人城市相同，则进入派件状态
                            const Dispatchers = orm.import('../database/models/Dispatchers')
                            await Dispatchers.count().then(async count => {
                              const rand = Math.floor(Math.random() * count)
                              await Dispatchers.findOne({
                                offset: rand
                              })
                                .then(async randomProject => {
                                  // 随机一个派件员
                                  const randomUUID = randomProject.get('uuid')
                                  const DispatchPairs = orm.import('../database/models/DispatchPairs')
                                  await DispatchPairs.create({
                                    package_id: params.package_id,
                                    uuid: randomUUID
                                  })
                                    // 加入派件信息表
                                    .then(() => {
                                      response.sendStatus(200)
                                    })
                                })
                            })
                          } else {
                            response.sendStatus(200)
                          }
                        })
                    })
                })
            }, () => {
              response.sendStatus(403)
            })
          })
      } else {
        response.sendStatus(403)
      }
    })
})

const getCascadedLocation = require('../database/utils').getCascadedLocation

router.post('/Package/Query', jwt_decode({
  secret: secretKey
}), async (request, response) => {
  const payload = request.body
  await Packages.findAll(payload)
    .then(async project => {
      for (const p of project){
        console.log(getCascadedLocation())
        // 这里一定一定要 await 的啊啊啊啊啊
        p.sender_city = await getCascadedLocation(p.sender_city)
        p.receiver_city = await getCascadedLocation(p.receiver_city)
      }
      response.json(project)
    })
})

router.post('/Package/Delete', jwt_decode({
  secret: secretKey
}), async (request, response) => {
  await Receptionists.findOne({
    where: {
      receptionist_id: request.user.uuid
    }
  })
    .then(async auth => {
      if (auth != null) {
        const params = request.body
        await Packages.destroy({
          where: params
        })
          .then(() => {
            response.sendStatus(200)
          })
          .catch(() => {
            response.sendStatus(406)
          })
      } else {
        response.sendStatus(403)
      }
    })
})

module.exports = router
