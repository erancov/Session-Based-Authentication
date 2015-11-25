'use strict';


module.exports.isAuthenticated = isAuthenticated;

function isAuthenticated(req, res, next) {
    if(req.user) {
      req.session.messages = [];
      return next();
    }else{
      res.redirect('/login');
    }
}
