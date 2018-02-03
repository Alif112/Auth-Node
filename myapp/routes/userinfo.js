var express = require('express');
var router = express.Router();
 var home = require('../app/controllers/home');


var UserInfo= require('../app/controllers/userinfo_controller');


router.get('/basic',home.loggedIn,UserInfo.info);
router.get('/getdata',home.loggedIn,UserInfo.getdata);
router.post('/createdata',home.loggedIn,UserInfo.createdata);
router.put('/update/:id',home.loggedIn,UserInfo.updatedata);

exports = module.exports =router;
