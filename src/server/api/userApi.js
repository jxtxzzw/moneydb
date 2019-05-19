const models = require('../database/mysql')
const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const $sql = require('../database/sqlMap')

// 连接数据库
const conn = mysql.createConnection(models.mysql)

conn.connect()
const jsonWrite = function(res, ret) {
  if(typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret)
  }
}

// 增加用户接口
router.post('/addUser', (req, res) => {
  const sql = $sql.user.add
  const params = req.body
  console.log(params)
  conn.query(sql, [params.username, params.age], function(err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

router.post('/login', (req, res) => {
  const sql = $sql.user.login
  const params = req.body
  conn.query(sql, [params.username, params.password], function(err, result) {
    if (err) {
      console.log(err)
    }
    if (result && result.length > 0) {
      console.log(result)
      jsonWrite(res, result)
    } else {
      console.log(result)
      res.sendStatus(403)
    }
  })
})

module.exports = router
