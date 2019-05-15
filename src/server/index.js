// node 后端服务器

const userApi = require('./api/userApi')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
const app = express()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:9080')
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Accept')
  res.header('Access-Control-Allow-Credentials', 'true')
  if (req.method === 'OPTIONS') {
    res.end()
  } else {
    next()
  }
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// 后端api路由
app.use('/api/user', userApi)

//使用express-session下发session
app.set('trust proxy', 1)
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))


app.get('/profile', function (req, res) {
  if(req.session.login){
    res.send("hello world")
  }else{
    res.sendStatus(403)
  }
})


// 监听端口
app.listen(3000)
console.log('success listen at port:3000......')
