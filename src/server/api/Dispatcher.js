const express = require('express')
const router = express.Router()

const orm = require('../database/utils').orm()

const DispatchPairs = orm.import('../database/models/DispatchPairs')
const Dispatchers = orm.import('../database/models/Dispatchers')
const Employees = orm.import('../database/models/Employees')

router.post('/Dispatcher/Info', async (request, response) => {
  const package_id = request.body.package_id
  await DispatchPairs.findOne({
    where: {
      package_id: package_id,
    },
    attributes: ['uuid']
  })
    .then(async uuidProject => {
      if (uuidProject != null) {
        const uuid = uuidProject.get('uuid')
        await Dispatchers.findOne({
          where: {
            uuid: uuid
          },
          attributes: ['rate']
        }).then(async rateProject => {
          const rate = rateProject.get('rate')
          await Employees.findOne({
            where: {
              uuid: uuid
            },
            attributes: ['phone', 'name']
          })
            .then(phoneProject => {
              const name = phoneProject.get('name')
              const phone = phoneProject.get('phone')
              response.json({
                name: name,
                phone: phone,
                rate: rate
              })
            })
        })
      }
    })
})

module.exports = router
