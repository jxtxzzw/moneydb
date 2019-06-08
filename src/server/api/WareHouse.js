const express = require('express')
const router = express.Router()

const orm = require('../database/utils').orm()

const jwt_decode = require('express-jwt')
const {secretKey} = require('../router/salt')

const WareHouses = orm.import('../database/models/WareHouses')

router.post('/WareHouse/Count', jwt_decode({
  secret: secretKey
}), async (request, response) => {
  await WareHouses.count().then(count => {
    response.json({
      count: count
    })
  })
})

router.post('/WareHouse/Max', jwt_decode({
  secret: secretKey
}), async (request, response) => {
  await WareHouses.count().then(async count => {
    if (count === 0) {
      response.json({
        max: 0
      })
    } else {
      await WareHouses.max('warehouse_id').then(max => {
        response.json({
          max: max
        })
      })
    }
  })
})


router.post('/WareHouse/Add', jwt_decode({
  secret: secretKey
}), async (request, response) => {
  WareHouseManagers.findOne({
    where: {
      manager_id: request.user.uuid
    }
  })
    .then(async auth => {
      if (auth != null) {
        const payload = request.body
        payload.location = payload.location[payload.location.length - 1]
        await WareHouses.findOne({
          where: {
            warehouse_id: payload.warehouse_id
          }
        })
          .then(async project => {
            if (!project) {
              let inSequence = false
              await WareHouses.count().then(async count => {
                await WareHouses.max('warehouse_id').then(async max => {
                  inSequence = ((count === 0 && payload.warehouse_id === 1) || payload.warehouse_id === max + 1)
                  if (inSequence) {
                    await WareHouses.create(payload)
                      .then(() => {
                        response.sendStatus(200)
                      })
                  } else {
                    response.sendStatus(403)
                  }
                })
              })
            } else {
              await WareHouses.update(payload,{
                where: {
                  warehouse_id: payload.warehouse_id
                }
              }).then( () => {
                  response.sendStatus(200)
                }
              )
            }
          })
      } else {
        response.sendStatus(403)
      }
    })
})

const getCascadedLocation = require('../database/utils').getCascadedLocation

router.post('/WareHouse/Query', jwt_decode({
  secret: secretKey
}), async (request, response) => {
  const payload = request.body
  await WareHouses.findAll(payload)
    .then(async project => {
      for (const p of project){
        // 这里一定一定要 await 的啊啊啊啊啊
        p.location = await getCascadedLocation(p.location)
      }
      response.json(project)
    })
})

const WareHouseManagers = orm.import('../database/models/WareHouseManagers')
router.get('/WareHouse/ManagerList', jwt_decode({
  secret: secretKey
}), async (request, response) => {
  await WareHouseManagers.findAll({
    attributes: ['manager_id']
  })
    .then(project => {
      response.json(project)
    })
})

router.post('/WareHouse/Delete', jwt_decode({
  secret: secretKey
}), async (request, response) => {
  WareHouseManagers.findOne({
    where: {
      manager_id: request.user.uuid
    }
  })
    .then(async auth => {
      if (auth != null) {
        const params = request.body
        await WareHouses.destroy({
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
