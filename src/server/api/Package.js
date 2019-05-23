const express = require('express')
const router = express.Router()
const orm = require('../database/utils').orm()

const Packages = orm.import('../database/models/Packages')
router.post('/Query', (request, response) => {
  const params = request.body
  Packages.findAll({
    where: params
  }).then(project => {
    response.json(project)
  })
})

const Trackings = orm.import('../database/models/Trackings')
router.post('/Tracking', (request, response) => {
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
