const express = require('express');
const router  = express.Router();
const User    = require('../controller/userController')
const isLogin = require('../helper/authentication')
const isAdmin = require('../helper/authorization')
const isSelf  = require('../helper/authOwnOrAdm')

router.get('/', User.findAll)
router.post('/', User.createUser)
router.get('/:id/', isLogin, isSelf, User.getUserProfile)
router.put('/:id/', isLogin, isSelf, User.updateUser)
router.delete('/:id', isLogin, isSelf, User.deleteUser)
router.post('/signup', User.register)
router.post('/signin', User.login)

module.exports = router;
