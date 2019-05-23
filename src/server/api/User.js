const express = require('express')
const router = express.Router()
const orm = require('../database/utils').orm()
const Members = orm.import('../database/models/Members')
const jwt = require("jsonwebtoken")
const { secretKey } = require('../router/constant')

router.post('/User/Login', (request, response) => {
  const params = request.body
  Members.findOne({
    where: {
      email: params.username,
      password: params.password
    },
    attributes: ['uuid']
  }).then(project => {
    if (project == null) {
      response.json({
        success: false,
        token: ''
      })
    } else {
      const token = jwt.sign(
        project.get(),
        secretKey,
        {
          expiresIn: 600
        }
      )
      response.json({
        success: true,
        token: token
      })
    }
  })
})

module.exports = router
