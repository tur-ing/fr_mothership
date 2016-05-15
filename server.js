var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var MagentoAPI = require('magento');
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
var magento = new MagentoAPI({
  host: 'localhost',
  port: 8080,
  path: '/frischemarkt-19/magento/api/xmlrpc/',
  login: 'mothership',
  pass: 'bvZ0k0B02pTjujN'
});

mongoose.connect(configDB.url);

passport.use(new LocalStrategy (
    function(username, password, done) {
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
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


app.use(express.static('views'));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'bvZ0k#0B02pTj@#ujN' }));
app.use(passport.initialize());
app.use(passport.session());

require('./app/routes.js');

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
});