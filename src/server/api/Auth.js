const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.sendStatus(403)
})

module.exports = router
