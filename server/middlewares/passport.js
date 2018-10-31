const passport = require('passport')
const passportJWT = require('passport-jwt')
const db = require('../db')
const LocalStrategy = require('passport-local').Strategy

const ExtractJWT = passportJWT.ExtractJwt
const JWTStrategy = passportJWT.Strategy

const secretKey = 'secret secret s3cr3t k3y'

module.exports.default = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      function(email, password, cb) {
        const user = db.findByEmailPassword(email, password)
        if (!user) return cb(null, false, { message: 'Incorrect email or password.' })
        return cb(null, user, { message: 'Logged In Successfully' })
      }
    )
  )

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: secretKey
      },
      (jwtPayload, cb) => {
        const user = db.findOneById(jwtPayload.id)
        if (user == null) return cb('User not founded')
        else return cb(null, user)
      }
    )
  )
  return passport
}

module.exports.secret = secretKey
