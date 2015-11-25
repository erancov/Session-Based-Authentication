'use strict';

var express         = require('express');
var app             = express();


module.exports.login = login;
module.exports.loggedIn = loggedIn;
module.exports.logout = logout;


 function login(req, res, next) {
   res.render('login', {message: req.session.messages});
}

function loggedIn(req, res, next) {
    res.render('dashboard');
}

function logout(req, res, next) {
    req.logout();
    res.redirect('/login');
}
