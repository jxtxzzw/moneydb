// 注册路由
const express = require('express')
const router = express.Router()

/*
 路由中间件
 */
// 所有请求过来都会进行身份验证
const jwtAuth = require('./jwt')
router.use(jwtAuth)

// 注意哦，uuid 一定要从 token 解密中获得，不能从 payload 中因为会伪造，而 auth 没办法伪造 Bearer

// router.use((request, response, next) => {
//   // 任何路由信息都会执行这里面的语句
//   console.log('this is a api request!')
//   // 把它交给下一个中间件，注意中间件的注册顺序是按序执行
//   next()
// })

const User = require('../api/User')
router.use(User)

const Package = require('../api/Package')
router.use(Package)

const Location = require('../api/Location')
router.use(Location)

const WareHouse = require('../api/WareHouse')
router.use(WareHouse)

const Employee = require('../api/Employee')
router.use(Employee)

const DispatchPair = require('../api/DispatchPair')
router.use(DispatchPair)

const UserQuery = require('../api/UserQuery')
router.use(UserQuery)

const Dispatcher = require('../api/Dispatcher')
router.use(Dispatcher)

// 处理 404
router.use((request, response, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// 处理5错误
router.use((err, request, response, next) => {
  if (err.name === 'UnauthorizedError') {
    response.status(401).json({
      message: 'invalid token',
      error: err
    })
  } else {
    response.status(err.status || 500)
    response.json({
      message: err.message,
      error: err
    })
  }
})

module.exports = router
