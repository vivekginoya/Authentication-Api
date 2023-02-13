var express = require('express');
var userController = require('../conrollers/user');
var router = express.Router();

/* GET home page. */
router.post('/signup', userController.Signup)

router.post('/signin', userController.Signin);

router.get('/showuser', userController.Secure , userController.ShowUser);

module.exports = router;
