var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var MagentoAPI = require('magento');
var mongoose = require('mongoose');
var common = require('./common.js');
var config = common.config();
var configDB = require('./config/database.js');
var magento = new MagentoAPI({
  host: 'localhost',
  port: 8080,
  path: '/frischemarkt-19/magento/api/xmlrpc/',
  login: 'mothership',
  pass: 'bvZ0k0B02pTjujN'
});

mongoose.connect(configDB.url);

/*passport.use(new LocalStrategy (
    function(username, password, done) {
      if (username === "admin" && password === "admin")
        return done(null, {name: "admin"});
      return done(null, false, { message: 'Incorrect username.' });

      User.findOne({ username: username }, function(err, user) {
        if(err) { return done(err); }
        if(!user) {
          return done(null, false, { message: 'Falscher Nutzername'});
        }
        if(!user.validPassword(password)) {
          return done(null, false, { message: 'Passwort falsch'});
        }
        return done(null, user);
      });

    }
));*/

passport.use(new LocalStrategy(
    function(username, password, done) {
      if (username === "admin" && password === "admin") // stupid example
        return done(null, {name: "admin"});

      return done(null, false, { message: 'Incorrect username.' });
    }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var auth = function(req, res, next){
  if (!req.isAuthenticated())
    res.send(401);
  else
    next();
};

var app = express();
app.use(express.static('views'));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'bvZ0k#0B02pTj@#ujN' }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res){
  res.render('index.html');
});

app.get('/users', auth, function(req, res){
  res.send([{name: "user1"}, {name: "user2"}]);
});

app.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

app.post('/login', passport.authenticate('local'), function(req, res) {
  res.send(req.user);
});

app.post('/logout', function(req, res){
  req.logOut();
  res.send(200);
});

var magentoCallback = function(data) {
  console.log('Got data: ' + data);
  console.log(data);
};

magento.login(function(err, sessId) {
  if (err) {
    console.log("Error accessing Magento");
    console.log(err);
    console.log("Session ID: " + sessId);
    return;
  }
  console.log("Connected to Magento");
  magento.core.info(magentoCallback);
});

app.listen(3000, function () {
  console.log('Racing on port 3000');
  console.log('Using mongoDB: ' + config.mongoUrl);
});