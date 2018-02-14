const User   = require('../models/User')
const jwt    = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10);

class UserController {
  static findAll(req, res) {
    User.find()
    .then(users => {
      res.status(200).json({
        message: 'list all user',
        user: users
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
  }

  static createUser(req, res){
    let objUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      status: req.body.status
    }

    let user = new User(objUser)
    user.save()
      .then(dataUser => {
        res.status(200).json({
          message: 'new user created!',
          user: dataUser
        })
      })
      .catch(err => {
        console.log(err)
        res.status(400).send(err)
      })
  }

  static getUserProfile(req, res) {
    User.findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(400).json({
            msg: `can't find this user`
          })
        }
        res.status(200).json({
          msg: 'find one user',
          user: user
        })
        .catch(err => {
          console.log(err)
          res.status(500).send(err)
        })
      })
  }

  // middleware on
  static updateUser(req, res) {
    User.findOne({
      _id: req.params.id
    })
      .then(user => {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email,
        user.password = req.body.password || user.password,
        user.status   = req.body.status || user.status

        user.save()
          .then(updatedUser => {
            res.status(200).json({
              message: 'user updated',
              user: updatedUser
            })
          })
          .catch(err => {
            console.log(err)
            res.status(401).send(err)
          })
      })
      .catch(err => {
        console.log(err)
        res.status(500).send(err)
      })
  }

  static deleteUser(req, res) {
    User.findByIdAndRemove(req.params.id)
      .then(user => {
        res.status(200).json({
          message : 'deleted',
          user : user
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).send(err)
      })
  }

  static register(req, res){
    let objUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }

    let user = new User(objUser)
    user.save()
      .then(dataUser => {
        res.status(200).json({
          message: 'sign up success!',
          user: dataUser.username
        })
      })
      .catch(err => {
        console.log(err)
        res.status(400).send(err)
      })
  }

  static login(req, res) {
    User.findOne({
      email: req.body.email
    })
      .then(user => {
        if (!user) {
          return res.status(403).json({
            message: 'email not found'
          })
        }

        if (!bcrypt.compareSync(req.body.password, user.password)) {
          return res.status(403).json({ 
            message: 'invalid email or password'
          })
        } 

        let payload = {
          id       : user._id,
          username : user.username,
          email    : user.email,
          status   : user.status
        }
        
        jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
          if(!err) {
            return res.status(200).json({
              message : 'authentication valid!',
              userId  : user._id,
              token   : token
            })
          }
        })
      })
      .catch(err => {
        console.log(err)
        res.status(401).send(err)
      }) 
  }

}

module.exports = UserController