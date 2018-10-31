const nanoid = require('nanoid')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const dbName = `db.${process.env.NODE_ENV}.json`
const adapter = new FileSync(dbName)
const db = low(adapter)

db.defaults({ users: [] }).write()
db.read()

module.exports.createUser = (email, password) => {
  const existUser = db
    .get('users')
    .find({ email })
    .value()
  if (existUser) return null

  const id = nanoid()
  db.get('users')
    .push({ email, password, id })
    .write()

  return { email, id }
}
module.exports.findOneById = id => {
  const user = db
    .get('users')
    .find({ id })
    .value()
  return user
}

module.exports.findByEmailPassword = (email, password) => {
  const user = db
    .get('users')
    .find({ email, password })
    .value()
  return user
}
