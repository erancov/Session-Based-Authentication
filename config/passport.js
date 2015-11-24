var passportLocal     = require('passport-local').Strategy;
var  bCrypt           = require('bcrypt-nodejs');
var ClientModel       = require('./../models/client');


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
            console.log('User Not Found with username '+username);
            return done(null, false, {message: 'Oops! No  username.'});
          }
          if (!isValidPassword(user, password)){
                   console.log('Invalid Password');
                   return done(null, false,
                       {message: 'Oops! No  password.'});
                 }

        return done(null, user);
      }
    )
  }));

  var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
  }

}
