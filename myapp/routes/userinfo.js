var express = require('express');
var router = express.Router();
 var home = require('../app/controllers/home');

var UserInfo= require('../app/controllers/userinfo_controller');


router.get('/basic',home.loggedIn,UserInfo.info);

exports = module.exports =router;
