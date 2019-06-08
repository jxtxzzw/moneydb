const express = require('express')
const router = express.Router()

const orm = require('../database/utils').orm()

const Locations = orm.import('../database/models/Locations')

router.post('/Location/Query', async (request, response) => {
  const params = request.body
  if (!params.father) {
    params.father = null
  }
  await Locations.findAll({
    where: params,
    attributes: ['location']
  })
    .then(project => {
      response.json(project)
    })
})

module.exports = router
