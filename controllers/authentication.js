'use strict';

var express         = require('express');
var app             = express();


module.exports.login = login;
module.exports.loggedIn = loggedIn;
module.exports.logout = logout;


 function login(req, res, next) {
    console.log(req.session.messages);
   res.render('login');
}

function loggedIn(req, res, next) {
  console.log(req.user);
    req.session.messages = [];
  if(req.isAuthenticated()) {
    res.render('dashboard');
  }else {
    res.redirect('/login');
  }

}

function logout(req, res, next) {
    req.logout();
    res.redirect('/login');
}
