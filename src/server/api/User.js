const express = require('express')
const router = express.Router()

const orm = require('../database/utils').orm()

const Members = orm.import('../database/models/Members')
const jwt = require('jsonwebtoken')
const {secretKey} = require('../router/salt')

const jwt_decode = require('express-jwt')

router.post('/User/Auth', jwt_decode(
  {
    secret: secretKey
  }), (request, response) => {
  const uuid = request.user.uuid
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

router.post('/User/Login', async (request, response) => {
  const params = request.body
  await Members.findOne({
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

router.post('/User/ChangePassword', jwt_decode({secret: secretKey}), async (request, response) => {
  const params = request.body
  await Members.findOne({
    where: {
      uuid: request.user.uuid, // 只能修改自己的密码
      password: params.oldPassword // 且必须校验一次旧密码
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
        }).then(() => {
          response.sendStatus(200)
        }, () => {
          response.sendStatus(406)
        })
      }
    })
})

const HR = orm.import('../database/models/HumanResources')
router.post('/User/ResetPassword', jwt_decode({secret: secretKey}), async (request, response) => {
  const params = request.body
  await HR.findOne({
    where: {
      hr_id: request.user.uuid
    }
  })
    .then(async auth => {
      if (auth != null) {
        await Members.findOne({
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
      } else {
        response.sendStatus(403)
      }
    })
})

router.post('/User/Email', jwt_decode({secret: secretKey}), async (request, response) => {
  const uuid = request.body.uuid
  await Members.findOne({
    where: {
      uuid: uuid
    }
  })
    .then(project => {
      if (project == null) {
        response.sendStatus(403)
      } else {
        response.json(project.get('email'))
      }
    })
})

module.exports = router
