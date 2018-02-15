const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  jwt.verify(req.headers.token, process.env.SECRET_KEY, (err, decoded) => {
    
    if(err){
      res.status(403).json({
        message: 'acces denied'
      })
    }else{
      req.decoded = decoded
      next()
    }
  })
}