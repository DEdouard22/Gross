const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const models = require('./server/models');

const setupAuth = (app) => {
    app.use(cookieParser());

    app.use(session({
        secret: 'secretserverword',
        resave: true,
        saveUninitialized: true,
    }));

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.APP_URL}/auth/google/callback`
    },
    function(accessToken, refreshToken, profile, done) {
        models.User.findOrCreate({
            where: {
                googleId: profile.id
            },
            defaults: {
                firstName: profile.name.givenName, // added lines 32 -33 to populate user's firstName and lastName
                lastName: profile.name.familyName,
                username: profile.login,
                googleId: profile.id,
                email: profile.email,
            }
        })
        .then(result => {
            return done(null, result[0]);
        })
        .catch(done);
    }
));

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${process.env.APP_URL}/auth/facebook/callback`
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ facebookId: profile.id } , function(err, user) {
        if (err) { return done(err); }
        done(null, user);
        });
    }
));

// add the local (user/pass) strategy
passport.use(new LocalStrategy({
    // options: https://github.com/jaredhanson/passport-local#parameters
    // change these if you want a different field name for username or password
    usernameField: 'username',
    passwordField: 'password',
}, (username, password, done) => {
    // check if there is a user with the username given
    models.User.findOne({
        where: {
            'username': username
        }
    })
    .then((currentUser) => {
        // if there isn't a current User
        if (!currentUser) {
            // return an error
            return done(null, false, { message: 'Incorrect username' })
        }
        // If the password doesn't match
        if (!bcrypt.compareSync(password, currentUser.password)) {
            // return an error
            return done(null, false, { message: 'Incorrect password' })
        }
        // otherwise, return the user object
        return done(null, currentUser)
    })
    .catch(done);
}));

passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser((userId, done) => {
    done(null, userId);
})

app.use(passport.initialize());

app.use(passport.session());

// this is a simple API to check if there is a user
app.get('/api/user', (req, res, next) => {
    if (req.user) {
        return res.json({ user: req.user })
    } else {
        return res.json({ user: null })
    }
})


// app.get('/auth/google', (req, res) => { console.log("Incoming request to auth"); res.send({"check": "checking"}); });
app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page, Or in this case, the calendar.
app.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
    console.log(req.user);
    res.redirect('http://localhost:3000/calendar');
});

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));
app.post('/auth/signup', (req, res) => {
    // destructure username and password off req.body into new constants
    const { username, password } = req.body;
    // Check if there is a user with the given username
    models.User.findOne({
        where: {
            'username': username
        }
    })
    .then((currentUser) => {
        // if there is a user already
        if (currentUser) {
            // return an error
            return res.json({
                error: `Sorry, already a username '${username}' is already taken`
            });
        }
        // otherwise, create a new user and encrypt the password
        models.User.create({
            'username': username,
            'password': bcrypt.hashSync(password, 10)
        })
        .then((newUser) => {
            // we don't want to return everything, so put all the fields into a new object
            const data = {
                ...newUser.get()
            };
            // and then delete the password off that object
            delete data.password;
            // return the cleaned object
            return res.json(data);
        })
        .catch((err) => {
            // if there's an error, return that
            return res.json(err);
        });
    })
})

app.post('/auth/login',
passport.authenticate('local'),
(req, res) => {
    // req.user will have been deserialized at this point, so we need
    // to get the values and remove any sensitive ones
    const cleanUser = {...req.user.get()};
    if (cleanUser.password) {
        console.log(`Removing password from user:`, cleanUser.username);
        delete cleanUser.password
    }
    res.json({ user: cleanUser });
}
)

app.get('/auth/logout', (req, res, next) => {
    if (req.user) {
        req.logout();
        return res.json({ msg: 'user logged out' });
    } else {
        return res.json({ msg: 'no user to log out' });
    }
});
}

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = setupAuth;
module.exports.ensureAuthenticated = ensureAuthenticated;