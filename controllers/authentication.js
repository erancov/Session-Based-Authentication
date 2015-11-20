'use strict';

var express         = require('express');


module.exports.login = login;

 function login(req, res, next) {

  res.render('login', {
    isAuthenticated: req.isAuthenticated(),
    user: req.user
  });

}
