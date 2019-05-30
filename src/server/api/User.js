const express = require('express')
const router = express.Router()

const orm = require('../database/utils').orm()

const Members = orm.import('../database/models/Members')
const jwt = require('jsonwebtoken')
const {secretKey} = require('../router/salt')

const jwt_decode = require('express-jwt')

router.post('/User/Auth', jwt_decode({secret: secretKey}), (request, response) => {
  const uuid = request.user.uuid
  // 之后JWT生成token的时候加上组，这里取出组以后再做一次查权限
  // 过期用插件自带的就好，不要自己做了
  Members.findOne({
    where: {
      uuid: uuid
    },
    attributes: ['uuid']
  })
    .then(project => {
      if (project == null) {
        response.sendStatus(401)
      } else {
        response.sendStatus(200)
      }
    })
})

router.post('/User/Login', (request, response) => {
  const params = request.body
  Members.findOne({
    where: {
      email: params.username,
      password: params.password
    },
    attributes: ['uuid']
  })
    .then(project => {
      if (project == null) {
        response.json({
          success: false,
          token: ''
        })
      } else {
        const token = jwt.sign(
          project.get(),
          secretKey,
          {
            expiresIn: 600
          }
        )
        response.json({
          success: true,
          token: token
        })
      }
    })
})

module.exports = router
