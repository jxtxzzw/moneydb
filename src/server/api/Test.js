const express = require('express')
const router = express.Router()
const orm = require('../database/utils').orm()
const Tests = orm.import('../database/models/Tests')
router.get('/Test', (request, response) => {
  Tests.findAll().then(project => {
    // 算了，做成异步查询的吧，把父亲为 null 的做第一层，后面选了一层，异步获取，但是允许停在任意一层
})

module.exports = router
