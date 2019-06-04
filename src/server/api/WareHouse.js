const express = require('express')
const router = express.Router()

const orm = require('../database/utils').orm()

const jwt_decode = require('express-jwt')
const {secretKey} = require('../router/salt')

const WareHouses = orm.import('../database/models/WareHouses')

router.post('/WareHouse/Count', jwt_decode({
  secret: secretKey
}), (request, response) => {
  WareHouses.count().then(count => {
    response.json({
      count: count
    })
  })
})

router.post('/WareHouse/Max', jwt_decode({
  secret: secretKey
}), (request, response) => {
  WareHouses.count().then(count => {
    if (count === 0) {
      response.json({
        max: 0
      })
    } else {
      WareHouses.max('warehouse_id').then(max => {
        response.json({
          max: max
        })
      })
    }
  })
})


router.post('/WareHouse/Add', jwt_decode({
  secret: secretKey
}), (request, response) => {
  const payload = request.body
  payload.location = payload.location[payload.location.length - 1]
  WareHouses.findOne({
    where: {
      warehouse_id: payload.warehouse_id
    }
  })
    .then( project => {
      if (!project) {
        let inSequence = false
        WareHouses.count().then(count => {
          if (count === 0) {
            inSequence = payload.warehouse_id === 1
          } else {
            WareHouses.max('warehouse_id').then(max => {
              inSequence = payload.warehouse_id === max + 1
            })
          }
          if (inSequence) {
            WareHouses.create(payload)
              .then(() => {
                response.sendStatus(200)
              })
          } else {
            response.sendStatus(403)
          }
        })
      } else {
        WareHouses.update(payload,{
          where: {
            warehouse_id: payload.warehouse_id
          }
        }).then( () => {
            response.sendStatus(200)
          }
        )
      }
    })

})

const getCascadedLocation = require('../database/utils').getCascadedLocation

router.post('/WareHouse/Query', jwt_decode({
  secret: secretKey
}), (request, response) => {
  const payload = request.body
  console.log(request.user.uuid)
  // 之后JWT生成token的时候加上组，这里取出组以后再做一次查权限
  // 过期用插件自带的就好，不要自己做了
  WareHouses.findAll(payload)
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
}), (request, response) => {
  console.log(request.user.uuid)
  WareHouseManagers.findAll({
    attributes: ['manager_id']
  })
    .then(project => {
      response.json(project)
    })
})

module.exports = router
