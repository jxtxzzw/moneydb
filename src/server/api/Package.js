const express = require('express')
const router = express.Router()

const orm = require('../database/utils').orm()

const jwt_decode = require('express-jwt')
const {secretKey} = require('../router/salt')

const Packages = orm.import('../database/models/Packages')

router.post('/Package/Count', jwt_decode({
  secret: secretKey
}), (request, response) => {
  Packages.count().then(count => {
    response.json({
      count: count
    })
  })
})

router.post('/Package/Max', jwt_decode({
  secret: secretKey
}), (request, response) => {
  Packages.count().then(count => {
    if (count === 0) {
      response.json({
        max: 0
      })
    } else {
      Packages.max('package_id').then(max => {
        response.json({
          max: max
        })
      })
    }
  })
})

router.post('/Package/Add', jwt_decode({
  secret: secretKey
}), (request, response) => {
  const payload = request.body
  payload.sender_city = payload.sender_city[payload.sender_city.length - 1]
  payload.receiver_city = payload.receiver_city[payload.receiver_city.length - 1]
  Packages.findOne({
    where: {
      package_id: payload.package_id
    }
  })
    .then( project => {
      if (!project) {
        let inSequence = false
        Packages.count().then(count => {
          Packages.max('package_id').then(max => {
            inSequence = ((count === 0 && payload.package_id === 1) || payload.package_id === max + 1)
            if (inSequence) {
              payload.status = '已揽件'
              Packages.create(payload)
                .then(() => {
                  response.sendStatus(200)
                })
            } else {
              response.sendStatus(403)
            }
          })
        })
      } else {
        Packages.update(payload,{
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

})

const Trackings = orm.import('../database/models/Trackings')
router.post('/Package/Tracking', (request, response) => {
  const params = request.body
  Packages.findAll({
    where: params,
    attributes: ['status']
  })
    .then(statusProject => {
      if (statusProject.length === 0) {
        response.json({
          status: 'NOT FOUND'
        })
      } else {
        const status = statusProject[0].status
        Trackings.findAll({
          where: params,
          attributes: ['log', 'date'],
          order: [['date', 'DESC']]
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

const getCascadedLocation = require('../database/utils').getCascadedLocation

router.post('/Package/Query', jwt_decode({
  secret: secretKey
}), (request, response) => {
  const payload = request.body
  console.log(payload)
  console.log(request.user.uuid)
  // 之后JWT生成token的时候加上组，这里取出组以后再做一次查权限
  // 过期用插件自带的就好，不要自己做了
  Packages.findAll(payload)
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
}), (request, response) => {
  const params = request.body
  console.log(request.user.uuid)
  // 之后JWT生成token的时候加上组，这里取出组以后再做一次查权限
  // 过期用插件自带的就好，不要自己做了
  Packages.destroy({
    where: params
  })
    .then(() => {
      response.sendStatus(200)
    })
    .catch(() => {
      response.sendStatus(406)
    })
})

module.exports = router
