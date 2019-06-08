const express = require('express')
const router = express.Router()

const orm = require('../database/utils').orm()

const jwt_decode = require('express-jwt')
const {secretKey} = require('../router/salt')

const Employees = orm.import('../database/models/Employees')
const Members = orm.import('../database/models/Members')

router.post('/Employee/Count', jwt_decode({
  secret: secretKey
}), async (request, response) => {
  await Employees.count().then(count => {
    response.json({
      count: count
    })
  })
})

router.post('/Employee/Max', jwt_decode({
  secret: secretKey
}), async (request, response) => {
  await Employees.count().then(async count => {
    if (count === 0) {
      response.json({
        max: 0
      })
    } else {
      await Employees.max('uuid').then(max => {
        response.json({
          max: max
        })
      })
    }
  })
})

const HR = orm.import('../database/models/HumanResources')
const TP = orm.import('../database/models/Transports')
const RC = orm.import('../database/models/Receptionists')
const WH = orm.import('../database/models/WareHouseManagers')
const DP = orm.import('../database/models/Dispatchers')

router.post('/Employee/Add', jwt_decode({
  secret: secretKey
}), async (request, response) => {
  await HR.findOne({
    where: {
      hr_id: request.user.uuid
    }
  })
    .then(async auth => {
      if (auth != null) {
        const payload = request.body
        const options = {}
        let uuid = payload.uuid
        if (payload.uuid === '') {
          payload.uuid = undefined
          await Employees.create(payload)
            .then(async project => {
              await Members.update({
                email: payload.email
              }, {
                where: {
                  uuid: project.uuid
                }
              })
                .then(() => {
                  uuid = project.uuid
                })
            })
            .catch((error) => {
            })
        } else {
          await Employees.findOne(options)
            .then(async project => {
              if (!project) {
              } else {
                await Employees.update(payload,{
                  where: {
                    uuid: payload.uuid
                  }
                })
              }
            })
            .catch(() => {
            })
        }
        const privileges = payload.privileges
        const flushPrivilege = async function(str, instance, option) {
          for (const x of privileges) {
            if (x === str) {
              await instance.findOrCreate({
                where: option
              }).then(async () => {
              })
              return
            }
          }
          await instance.destroy({
            where: option
          })
        }
        await flushPrivilege("仓储权限", WH, {manager_id: uuid})
        await flushPrivilege("前台接待权限", RC, {receptionist_id: uuid})
        await flushPrivilege("运输权限", TP, {transport_id: uuid})
        await flushPrivilege("人力资源权限", HR, {hr_id: uuid})
        await flushPrivilege("派件权限", DP, {uuid: uuid})
        return response.sendStatus(200)
      } else {
        response.sendStatus(403)
      }
    })

})

router.post('/Employee/Query', jwt_decode({
  secret: secretKey
}), async (request, response) => {
  const payload = request.body
  await Employees.findAll({
      where: payload.where,
      offset: payload.offset,
      limit: payload.limit,
      include: {
        attributes: ['email'],
        model: Members
      }
    }
  )
    .then(async project => {
      response.json(project)
    })
})

router.post('/Employee/EmailUnique', jwt_decode({
  secret: secretKey
}), async (request, response) => {
  const payload = request.body
  await Members.count({
    where: {
      email: payload.email
    }
  })
    .then(count => {
      response.json({
        unique: count === 0
      })
    })
})

router.post('/Employee/Privilege', jwt_decode({
  secret: secretKey
}), async (request, response) => {
  const uuid = request.body.uuid
  let privileges = []
  const queryPrivileges = async function(str, instance, option) {
    // 这个await 要加在这里，这里！！
    await instance.findOne({
      where: option
    })
      .then(project => {
        if (project != null) {
          privileges.push(str)
        }
      })
  }
  await queryPrivileges("仓储权限", WH, {manager_id: uuid})
  await queryPrivileges("前台接待权限", RC, {receptionist_id: uuid})
  await queryPrivileges("运输权限", TP, {transport_id: uuid})
  await queryPrivileges("人力资源权限", HR, {hr_id: uuid})
  await queryPrivileges("派件权限", DP, {uuid: uuid})
  response.json(privileges)
})

router.post('/Employee/Delete', jwt_decode({
  secret: secretKey
}), async (request, response) => {
  const params = request.body
  await HR.findOne({
    where: {
      hr_id: request.user.uuid
    }
  })
    .then(async auth => {
      if (auth != null) {
        await Employees.destroy({
          where: params
        })
          .then(() => {
            response.sendStatus(200)
          })
          .catch((error) => {
            console.log(error)
            response.sendStatus(406)
          })
      } else {
        response.sendStatus(403)
      }
    })
})

module.exports = router
