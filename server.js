var express         = require('express');
var swig            = require('swig');
var passport        = require('passport');
var passportLocal   = require('passport-local');
var passportHttp    = require('passport-http');
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');
var expressSession  = require('express-session');
var MongoClient     = require('mongodb').MongoClient;
var app             = express();
var port            = process.env.PORT || 1337;

app.use(express.static(__dirname + '/views'))
// set swig engine
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/Bank", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
  if(err) {
    return console.dir(err);
  }
  var collection = db.collection('clients');
});

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
passport.use(new passportLocal.Strategy(function(username, password, done){
    if(username === password){
      done(null, {id: username, name: username});
    }else{
      done(null, null);
    }
}));
passport.serializeUser(function(user, done){
  done(null, user.id);
});
passport.deserializeUser(function(id, done){
  done(null, { id:id, name:id });
});

//use route
app.use('/', require('./routes/login'));
app.use('/', require('./routes/dashboard'));
app.use('/', require('./routes/authentication'))

app.listen(port, function(){
  console.log('Running on port: ' + port);
});
