const jwt    = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if(req.decoded && req.decoded.status === 'admin') {
    return next()
  } else {
    res.status(403).json({
      message : 'you must an admin to access this page'
    })
  }
}