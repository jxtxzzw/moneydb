const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
  const params = req.body
  if (params.privilege === 'Login') {
    if (params.username === 'jxtxzzw' && params.password === '111111') {
      res.sendStatus(200)
    } else {
      res.sendStatus(403)
    }
  } else {
    // 去查权限表
  }
})

module.exports = router
