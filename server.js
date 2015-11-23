var swig                      = require('swig');
var  bCrypt                 = require('bcrypt-nodejs');
var passport              = require('passport');
var passportLocal    = require('passport-local').Strategy;
var passportHttp      = require('passport-http');
var bodyParser         = require('body-parser');
var cookieParser      = require('cookie-parser');
var expressSession = require('express-session');
var MongoClient      = require('mongodb').MongoClient;
var mongoose          = require('mongoose');
var port                      = process.env.PORT || 1337;
var db                         = mongoose.connect('mongodb://localhost:27017/Bank');
var ClientModel        = require('./models/client');

passport.use(new passportLocal(function(username, password, done){
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

passport.serializeUser(function(user, done){
done(null, user._id);
});

passport.deserializeUser(function(id, done){
    ClientModel.find({_id:id}, function(err, user){
      done(err, user);
    });
});

var express                = require('express');
var app                       = express();
// var hash = bCrypt.hashSync("1234");
// var student = new ClientModel(
//   {
//     email:"rancovmiroslav@gmail.com",
//     password: hash,
//     name:"Manu"
//   });
//
//   student.save();
app.use(express.static(__dirname + '/views'))
// set swig engine
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
   secret: process.env.SESSION_SECRET || 'secret',
   resave: false,
   saveUninitialized: false
 }));

//use passport
app.use(passport.initialize());
app.use(passport.session());

//use route
app.use('/', require('./routes/authentication'))
app.use('/', require('./routes/dashboard'));

app.listen(port, function(){
  console.log('Running on port: ' + port);
});
