module.exports = (contentType = 'application/json') => (req, res, next) => {
  const isContentTypeValid = req.headers['content-type'] === contentType

  if (!isContentTypeValid) res.status(415).send('')
  else next()
}
