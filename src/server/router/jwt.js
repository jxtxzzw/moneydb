const expressJwt = require('express-jwt')
const {secretKey} = require('./salt')

const jwtAuth = expressJwt({
  secret: secretKey,
  credentialsRequired: true // 设置为false就不进行校验了，游客也可以访问
})
  .unless({
    path: [
      '/User/Login',
      '/Package/Tracking',
      '/UserQuery/Query',
      '/UserQuery/Count',
      '/DispatchPair/ChangeRate',
      '/Dispatcher/Rate',
      '/Dispatcher/Info'
    ]
  })

module.exports = jwtAuth
