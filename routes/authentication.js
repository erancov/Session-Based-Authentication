'use strict';

var express              = require('express');
var router                  = express.Router();
var check                  = require('../middlewares/authentication');
var authCtrl               = require('../controllers/authentication');

router.get('/login', authCtrl.login);
router.post("/login", authCtrl.loginAuth);

router.get('/', check.isAuthenticated, authCtrl.loggedIn);
router.get('/logout', authCtrl.logout);

module.exports = router;
