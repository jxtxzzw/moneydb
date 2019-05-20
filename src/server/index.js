const express = require('express')
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser')
// const Auth = require('./api/Auth')
// const userApi = require('./api/userApi')
// const router  = require('./router')
const db = require('./database/connection')

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
// app.use('/', router)
app.set('trust proxy', 1)
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))


app.listen(3000)
console.log('success listen at port: 3000......')
