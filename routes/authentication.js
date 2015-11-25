'use strict';

var express         = require('express');
var passport        = require('passport');
var passportLocal   = require('passport-local');
var router          = express.Router();
var authCtrl        = require('../controllers/authentication');

router.get('/login', authCtrl.login);
router.post("/login", passport.authenticate("local-login", { successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: "Invalid username or password" }));

router.get('/', authCtrl.loggedIn);

router.get('/logout', authCtrl.logout);

module.exports = router;
