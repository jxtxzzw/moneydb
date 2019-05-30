const express = require('express')
const router = express.Router()

const orm = require('../database/utils').orm()

const Location = orm.import('../database/models/Locations')

router.post('/Location/Query', (request, response) => {
  const params = request.body
  if (!params.father) {
    params.father = null
  }
  Location.findAll({
    where: params,
    attributes: ['location']
  })
    .then(project => {
      response.json(project)
    })
})

module.exports = router
