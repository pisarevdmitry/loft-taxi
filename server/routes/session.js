const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')
const passport = require('passport')
const secretKey = require('../middlewares/passport').secret

router.post('/', function(req, res) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        user: user
      })
    }

    req.login(user, { session: false }, err => {
      if (err) res.send(err)

      const token = jwt.sign(user, secretKey)
      const { password, ...userParams } = user
      return res.json({ ok: true, user: userParams, token })
    })
  })(req, res)
})

module.exports = router
