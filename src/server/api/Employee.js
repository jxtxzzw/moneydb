const express = require('express')
const router = express.Router()

const orm = require('../database/utils').orm()

const jwt_decode = require('express-jwt')
const {secretKey} = require('../router/salt')

const Employees = orm.import('../database/models/Employees')
const Members = orm.import('../database/models/Members')

router.post('/Employee/Count', jwt_decode({
  secret: secretKey
}), (request, response) => {
  Employees.count().then(count => {
    response.json({
      count: count
    })
  })
})

router.post('/Employee/Max', jwt_decode({
  secret: secretKey
}), (request, response) => {
  Employees.count().then(count => {
    if (count === 0) {
      response.json({
        max: 0
      })
    } else {
      Employees.max('uuid').then(max => {
        response.json({
          max: max
        })
      })
    }
  })
})


router.post('/Employee/Add', jwt_decode({
  secret: secretKey
}), (request, response) => {
  const payload = request.body
  const options = {}
  if (payload.uuid === '') {
    payload.uuid = undefined
    console.log(payload)
    Employees.create(payload)
      .then(async project => {
        await Members.update({
          email: payload.email
        }, {
          where: {
            uuid: project.uuid
          }
        })
          .then(() => {
            response.sendStatus(200)
          })
      })
      .catch((error) => {
        console.log(error)
        response.sendStatus(403)
      })
  } else {
    Employees.findOne(options)
      .then( project => {
        if (!project) {
          response.sendStatus(403)
        } else {
          Employees.update(payload,{
            where: {
              uuid: payload.uuid
            }
          }).then( () => {
              response.sendStatus(200)
            }
          )
        }
      })
      .catch(() => {
        response.sendStatus(403)
      })
  }
})

router.post('/Employee/Query', jwt_decode({
  secret: secretKey
}), (request, response) => {
  const payload = request.body
  console.log(request.user.uuid)
  // 之后JWT生成token的时候加上组，这里取出组以后再做一次查权限
  // 过期用插件自带的就好，不要自己做了
  Employees.findAll(payload)
    .then(async project => {
      for (const p of project) {
        Members.findOne({
          where: {
            uuid: p.uuid
          },
          attributes: ['email']
        })
          .then(email => {
            p.email = email
          })
      }
      response.json(project)
    })
})

router.post('/Employee/EmailUnique', jwt_decode({
  secret: secretKey
}), (request, response) => {
  const payload = request.body
  console.log(request.user.uuid)
  // 之后JWT生成token的时候加上组，这里取出组以后再做一次查权限
  // 过期用插件自带的就好，不要自己做了
  Members.count({
    where: {
      email: payload.email
    }
  })
    .then(count => {
      console.log(count)
      response.json({
        unique: count === 0
      })
    })
})

router.post('/Employee/Delete', jwt_decode({
  secret: secretKey
}), (request, response) => {
  const params = request.body
  console.log(request.user.uuid)
  // 之后JWT生成token的时候加上组，这里取出组以后再做一次查权限
  // 过期用插件自带的就好，不要自己做了
  Employees.destroy({
    where: params
  })
    .then(() => {
      response.sendStatus(200)
    })
    .catch((error) => {
      console.log(error)
      response.sendStatus(406)
    })
})

module.exports = router
