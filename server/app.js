const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const bodyParser = require('body-parser')
const filterContentType = require('./middlewares/filterContentType')
const passportSetup = require('./middlewares/passport').default
const user = require('./routes/user')
const session = require('./routes/session')

passportSetup()

  var app = express()

app.use(logger('dev'))
app.use(cors())
app.use(filterContentType())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/user', user)
app.use('/session', session)

module.exports = app
