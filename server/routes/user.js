const express = require('express')
const secretKey = require('../middlewares/passport').secret
const jwt = require('jsonwebtoken')
const passport = require('passport')
const db = require('../db')

const router = express.Router()

router.post('/', function(req, res) {
  const { body } = req

  if (body == null || body.email == null || body.password == '') {
    res.status(422)
    res.json({ ok: false, error: 'email or password is empty' })
  } else {
    const user = db.createUser(body.email, body.password)

    if (user === null) {
      res.status(409)
      res.json({ ok: false, error: 'user alredy exist' })
    } else {
      const token = jwt.sign(user, secretKey)

      res.status(201)
      res.json({ ok: true, token: token, user })
    }
  }
})

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({
    ok: true,
    email: req.user.email,
    id: req.user.id,
    firstname: null,
    lastname: null,
    private: 'Это приватная информация доступная лишь авторизированным пользователям'
  })
})

module.exports = router
