const express = require('express')
const router = express.Router()

const orm = require('../database/utils').orm()

const jwt_decode = require('express-jwt')
const {secretKey} = require('../router/salt')

const DispatchPairs = orm.import('../database/models/DispatchPairs')
const Packages = orm.import('../database/models/Packages')

router.post('/DispatchPair/Count', jwt_decode({
  secret: secretKey
}), async (request, response) => {
  await DispatchPairs.count({
    where: {
      uuid: request.user.uuid
    },
    include: {
      model: Packages,
      where: {
        status: '派件中'
      }
    }
  }).then(count => {
    response.json({
      count: count
    })
  })
})

const getCascadedLocation = require('../database/utils').getCascadedLocation
router.post('/DispatchPair/Query', jwt_decode({
  secret: secretKey
}), async (request, response) => {
  const payload = request.body
  if (payload.where === null) {
    payload.where = {
      uuid: request.user.uuid
    }
  } else {
    payload.where.uuid = request.user.uuid
  }
  payload.include = [{
    model: Packages,
    attributes: [
      'package_id',
      'sender_name',
      'sender_phone',
      'receiver_name',
      'receiver_phone',
      'receiver_city',
      'receiver_address'
    ],
    where: {
      status: '派件中'
    }
  }]
  await DispatchPairs.findAll(payload)
    .then(async project => {
      for (const p of project){
        p.Package.receiver_city = await getCascadedLocation(p.Package.receiver_city)
      }
      response.json(project)
    })
})

router.post('/DispatchPair/Rate', async (request, response) => {
  const package_id = request.body.package_id
  await DispatchPairs.findOne({
    where: {
      package_id: package_id
    },
    attributes: ['rate']
  })
    .then(project => {
      if (project != null) {
        response.json(project.get())
      } else {
        response.sendStatus(403)
      }
    })
})

const Dispatchers = orm.import('../database/models/Dispatchers')
router.post('/DispatchPair/ChangeRate', async (request, response) => {
  const rate = request.body.rate
  const package_id = request.body.package_id
  await DispatchPairs.update({
    rate: rate
  }, {
    where:{
      package_id: package_id
    }
  }).then(async () => {
    await DispatchPairs.findOne({
      where: {
        package_id: package_id
      },
      attributes: ['uuid']
    }).then(async project => {
      const uuid = project.get('uuid')
      await DispatchPairs.sum('rate', {
        where: {
          uuid: uuid
        }
      }).then(async sum => {
        await DispatchPairs.count({
          where: {
            uuid: uuid
          }
        })
          .then(async count => {
            const avg = sum / count
            await Dispatchers.update({
              rate: avg
            }, {
              where: {
                uuid: uuid
              }
            }).then(() => {
              response.sendStatus(200)
            }).catch(error => {
              response.sendStatus(406)
            })
          })
      })
    })
  })
})

router.post('/DispatchPair/Done', jwt_decode({
  secret: secretKey
}), async (request, response) => {
  await Dispatchers.findOne({
    where: {
      uuid: request.user.uuid
    }
  })
    .then(async auth => {
      if (auth != null) {
        const payload = request.body
        await DispatchPairs.findOne({
          where: {
            package_id: payload.package_id,
            uuid: request.user.uuid
          },
          attributes: ['package_id']
        })
          .then(async project => {
            if (project != null) {
              await Packages.update({
                status: '已签收',
                receive_date: Date.now()
              }, {
                where: {
                  package_id: project.get('package_id')
                }
              })
                .then(() => {
                  response.sendStatus(200)
                })
            } else {
              response.sendStatus(403)
            }
          })
      } else {
        response.sendStatus(403)
      }
    })

})

module.exports = router
