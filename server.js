var swig                      = require('swig');
var passport               = require('passport');
var passportHttp       = require('passport-http');
var bodyParser          = require('body-parser');
var cookieParser       = require('cookie-parser');
var expressSession  = require('express-session');
var MongoClient       = require('mongodb').MongoClient;
var mongoose           = require('mongoose');
var config                   = require('./config/environments');
var port                       = process.env.PORT || config.server.port;
var db                          = mongoose.connect('mongodb://localhost:27017/Bank');
var configPassport   = require('./config/passport')(passport);
var express                = require('express');
var app                       = express();

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
app.use('/', require('./routes/authentication'));

app.listen(port, function(){
  console.log('Running on port: ' + port);
});
