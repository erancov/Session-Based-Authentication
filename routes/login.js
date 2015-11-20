var express         = require('express');
var passport        = require('passport');
var passportLocal   = require('passport-local');
var router          = express.Router();


module.exports = (function(){

  router.get('/login', function(req, res){
    res.render('login', {
      isAuthenticated: req.isAuthenticated(),
      user: req.user
    });
  });

  router.post('/login', passport.authenticate('local'), function(req, res){
    res.redirect('/');
  });

  return router;
})();
