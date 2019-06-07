const express = require('express')
const router = express.Router()

const orm = require('../database/utils').orm()

const Packages = orm.import('../database/models/Packages')
const Sequelize = require('sequelize')
router.post('/UserQuery/Count', (request, response) => {
  const phone = request.body.phone
  Packages.findAll({
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
const DispatchPairs = orm.import('../database/models/DispatchPairs')
router.post('/UserQuery/Query',  (request, response) => {
  // console.log(request)
  const phone = request.body.phone
  const payload = request.body.payload
  Packages.findAll({
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
    .catch(error => {
      console.log(error)
    })
})

module.exports = router