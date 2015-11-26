'use strict';

module.exports.isAuthenticated = isAuthenticated;

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }

    res.format({
      html: function() {
        res.redirect('/login');
      },
  // just in case :)
    text: function() {
      res.redirect('/login');
    },
    json: function() {
      res.status(401).json({ message: 'Unauthorized' });
    }
  });

}
