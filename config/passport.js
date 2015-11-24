var passportLocal     = require('passport-local').Strategy;
var  bCrypt           = require('bcrypt-nodejs');
var ClientModel       = require('./../models/client');
var flash             = require('connect-flash');

module.exports = function(passport) {


  passport.serializeUser(function(user, done){
  done(null, user._id);
  });

  passport.deserializeUser(function(id, done){
      ClientModel.find({_id:id}, function(err, user){
        done(err, user);
      });
  });


  passport.use('local-login', new passportLocal(function(username, password, done){
    ClientModel.findOne({email : username},
        function(err, user) {
      // In case of any error, return using the done method
        if (err) {
          return done(err);
        }

      // Username does not exist, log error & redirect back
          if (!user){
            return done(null, false, {message: 'Invalid email or password.'});
          }
          if (!isValidPassword(user, password)){

                   return done(null, false,
                       {message: 'Invalid email or password.'});
                 }

        return done(null, user);
      }
    )
  }));

  var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
  }

}
