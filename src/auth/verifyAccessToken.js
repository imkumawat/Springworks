const jwt = require('jsonwebtoken')


function verifyAccessToken(req, res, callback) {
  try {
    if (!req.headers.authorization) {
        console.log('Access token is missing')
      return res.status(404).json({ message: 'Access token is missing' })
    }
    try {
      const tokenSecret ='09f26e402586e2faa8da4c98a35f1b20d6b033c6'
    
      jwt.verify(req.headers.authorization, tokenSecret)
      callback()
    } catch (err) {
        console.log(err)
      return res.status(401).json({ message: 'Authorization failed' })
    }
  } catch (e) {
    console.log(e)
    return res.status(400).json({ message: 'Internal Server Error. Please try again later' })
  }
}

module.exports = verifyAccessToken