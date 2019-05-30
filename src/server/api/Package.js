const express = require('express')
const router = express.Router()

const orm = require('../database/utils').orm()

const jwt_decode = require('express-jwt')
const {secretKey} = require('../router/salt')

const Packages = orm.import('../database/models/Packages')

router.post('/Package/Query', jwt_decode({secret: secretKey}), (request, response) => {
  const payload = request.body
  console.log(request.user.uuid)
  // 之后JWT生成token的时候加上组，这里取出组以后再做一次查权限
  // 过期用插件自带的就好，不要自己做了
  Packages.findAll(payload)
    .then(project => {
      response.json(project)
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

module.exports = router
