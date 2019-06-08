const express = require('express')
const router = express.Router()

const orm = require('../database/utils').orm()

const Packages = orm.import('../database/models/Packages')
const Sequelize = require('sequelize')
router.post('/UserQuery/Count', async (request, response) => {
  const phone = request.body.phone
  await Packages.findAll({
    where: Sequelize.or({
      sender_phone: phone
    }, {
      receiver_phone: phone
    })
  }).then(project => {
    response.json({
      count: project.length
    })
  })
})

const getCascadedLocation = require('../database/utils').getCascadedLocation
router.post('/UserQuery/Query',  async (request, response) => {
  const phone = request.body.phone
  const payload = request.body.payload
  await Packages.findAll({
    where:
    Sequelize.and(
      payload.where,
      Sequelize.or({
        sender_phone: phone
      }, {
        receiver_phone: phone
      })
    ),
    offset: payload.offset,
    limit: payload.limit
  })
    .then(async project => {
      for (const p of project){
        p.sender_city = await getCascadedLocation(p.sender_city)
        p.receiver_city = await getCascadedLocation(p.receiver_city)
      }
      response.json(project)
    })
})



module.exports = router
