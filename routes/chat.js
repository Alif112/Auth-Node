var express = require('express');
var router = express.Router();

 var home = require('../app/controllers/home');

var Chat= require('../app/controllers/chat_controller');

router.get('/enter',home.loggedIn,Chat.enter);

exports = module.exports =router;
