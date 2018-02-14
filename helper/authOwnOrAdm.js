const jwt    = require('jsonwebtoken');

module.exports = function (req, res, next) {
  if (!req.decoded.id) {
    return res.status(403).json({
      message: 'access denied'
    })
  }
  
  if(req.decoded.id == req.params.id || req.decoded.status == 'admin') {
    return next()
  }else{
    res.status(403).json({
      message: 'you not authorize to this user'
    })
  }
  
}