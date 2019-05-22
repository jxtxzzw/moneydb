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

module.exports = router
