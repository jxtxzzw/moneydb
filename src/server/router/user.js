const express = require('express')
const jwt = require("jsonwebtoken")
const $sql = require('../database/sqlMap') // 引入模型
const { MD5_SUFFIX, md5, secretKey } = require('./constant')
const models = require('../database/mysql')
const mysql = require('mysql')

// 连接数据库
const conn = mysql.createConnection(models.mysql)
const router = express.Router();

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


// 获取用户列表
router.get('/list', (req, res) => {
  const sql = $sql.user.list
  const params = req.body
  conn.query(sql, function(err, result) {
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

// 用户登录接口
router.post('/login', (req, res) => {
  const params = req.body
  if (params.username === '1' && params.password === '1') {
    const token = jwt.sign(
      {
        username: params.username
      },
      secretKey,
      {
        expiresIn : 60
      }
    )
    res.json({
      success: true,
      message: 'success',
      token: token
    })
  } else {
    res.sendStatus(403)
  }
})

// 用户注册接口
// router.post('/register', (req, res) => {
//   console.log(req.body);
//   User.findOne({ //查找是否存在
//     username: req.body.username,
//   },(err, user)=>{
//     if (err) {
//       res.send('server or db error');
//     } else {
//       if (user === null) {
//         const insertObj = {
//           username: req.body.username,
//           password: md5(req.body.password + MD5_SUFFIX),
//           email: req.body.email,
//           role: 10.0
//         };
//         const newUser = new User(insertObj);
//         newUser.save(insertObj, (err, doc) => {
//           if (err) {
//             res.json({ result: false, msg: '用户注册失败' });
//           } else {
//             console.log(doc);
//             res.json({ result: true, msg: '用户注册成功' });
//           }
//         });
//       } else {
//         res.json({ result: false, msg: '用户名已存在'});
//       }
//     }
//   });
// });

module.exports = router;
