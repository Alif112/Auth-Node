var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');

exports.loggedIn = function(req, res, next) {
  if (req.session.user) { // req.session.passport._id
    next();

  } else {

    res.redirect('/login');

  }

}

exports.logOut = function(req, res, next) {
  console.log('logout --------mama ');
  if (req.session.user) {


    req.logout();
    req.flash('success_msg', 'You are logged out');
		req.session.destroy();
    res.redirect('/login');
  } else {
    next();
  }

}



exports.home = function(req, res) {
  var name=req.user.name;

  res.render('home.ejs', {
    error: req.flash("error"),
    success: req.flash("success"),
    session: req.session,
    name:name,

  });

}


exports.signup = function(req, res) {

  if (req.session.user) {

    res.redirect('/home');

  } else {

    res.render('signup', {
      error: req.flash("error"),
      success: req.flash("success"),
      session: req.session
    });
  }

}


exports.login = function(req, res) {



  if (req.session.user) {

    res.redirect('/home');

  } else {

    res.render('login', {
      error: req.flash("error"),
      success: req.flash("success"),
      session: req.session
    });

  }

}
