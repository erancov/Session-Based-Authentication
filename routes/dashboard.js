var express               = require('express');
var router                = express.Router();


module.exports = (function(){

  function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      next();
    }else{
      res.redirect('/login');
    }
  };

  router.get('/', ensureAuthenticated, function(req, res){
      res.render('dashboard');
  });

  router.get('/logout', function(req, res){
      req.logout();
      res.redirect('/login');
  });

  return router;
})();
