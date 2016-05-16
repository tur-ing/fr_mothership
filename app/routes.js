module.exports = function(app, passport) {
    
    app.get('/', function(req, res){
        res.render('index', { title: 'Express' });
    });

    app.get('/users', auth, function(req, res){
        res.send([{name: "user1"}, {name: "user2"}]);
    });
//==================================================================

//==================================================================
// route to test if the user is logged in or not
    app.get('/loggedin', function(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

// route to log in
    app.post('/login', passport.authenticate('local'), function(req, res) {
        res.send(req.user);
    });

// route to log out
    app.post('/logout', function(req, res){
        req.logOut();
        res.send(200);
    });
};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
};