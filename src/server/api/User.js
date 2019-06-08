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
            expiresIn: 86400
          }
        )
        response.json({
          success: true,
          token: token
        })
      }
    })
})

router.post('/User/ChangePassword', jwt_decode({secret: secretKey}), (request, response) => {
  const params = request.body
  Members.findOne({
    where: {
      uuid: request.user.uuid,
      password: params.oldPassword // 校验一次旧密码
    }
  })
    .then(project => {
      if (project == null) {
        response.sendStatus(403)
      } else {
        Members.update({
          password: params.newPassword
        }, {
          uuid: request.user.uuid
        })
      }
    })
})

router.post('/User/ResetPassword', jwt_decode({secret: secretKey}), (request, response) => {
  const params = request.body
  const uuid = request.user.uuid//如果不是管理员就不给做，直接403
  Members.findOne({
    where: params
  })
    .then(project => {
      if (project == null) {
        response.sendStatus(403)
      } else {
        Members.update({
          password: '112233' // 这里换成随机密码
        }, {
          where: params
        }).then(response.json(200))
      }
    })
})

module.exports = router
