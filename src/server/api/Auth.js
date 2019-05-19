const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
  const params = req.body
  if (params && params.privilege === 'Login') {
    if (params.username === '1' && params.password === '1') {
      console.log(params.to)
      if (!params.to || params.to && params.to === 'PackageManage') {
        res.sendStatus(200)
      } else {
        res.sendStatus(403)
      }
    } else {
      res.sendStatus(403)
    }
  } else {
    // 去查权限表
    res.sendStatus(403)
  }
})

module.exports = router
