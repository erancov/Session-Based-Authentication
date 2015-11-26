'use strict';
var passport        = require('passport');
var express         = require('express');
var app                 = express();


module.exports.login = login;
module.exports.loggedIn = loggedIn;
module.exports.logout = logout;
module.exports.loginAuth = passport.authenticate("local-login",{
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: "Invalid email or password"
  });

 function login(req, res, next) {
   res.render('login', {message: req.session.messages});
   delete req.session.messages;
}

function loggedIn(req, res, next) {
    res.render('dashboard');
    delete req.session.messages;
}

function logout(req, res, next) {
    req.logout();
    res.redirect('/login');
    delete req.session.messages;
}
