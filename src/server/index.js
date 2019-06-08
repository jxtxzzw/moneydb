const express = require('express')
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser')

const router = require('./router')
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:9080')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Credentials', 'true')
  if (req.method === 'OPTIONS') {
    res.end()
  } else {
    next()
  }
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/', router)
app.set('trust proxy', 1)
app.use(session({
  secret: 'jxtxzzw_secretKey_b6vj$tV<yw2T!4dD',
  resave: false,
  saveUninitialized: true
}))

app.listen(3000)
console.log('success listen at port: 3000......')
