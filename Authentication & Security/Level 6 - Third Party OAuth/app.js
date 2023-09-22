import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import findOrCreate from 'mongoose-findorcreate';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// https://www.passportjs.org/concepts/authentication/sessions/

app.use(session({
    secret: "Our little secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://127.0.0.1:27017/userDB");

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String, // Stores Google OAuth 2.0 user ID
    secret: String
});

// https://www.npmjs.com/package/passport-local-mongoose

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

// Set up Passport to use a local authentication strategy
passport.use(User.createStrategy());

// passport packs user data (session id) into cookie
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// passport opens cookie, see user session id, authenticate them on our server
passport.deserializeUser(async function (id, done) {
    await User.findById(id)
        .then((user) => done(null, user));
});

// Create Google OAuth 2.0 Credentials (clientID & clientSecret)
// https://www.youtube.com/watch?v=pBVAyU4pZOU

// https://www.passportjs.org/packages/passport-google-oauth20/

// Set up Passport to use Google OAuth 2.0 strategy
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
    function (accessToken, refreshToken, profile, cb) {
        // console.log(profile)
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

app.get("/", (req, res) => {
    res.render("home");
});

// Google OAuth authentication route
app.get("/auth/google",
    passport.authenticate("google", { scope: ["profile"] })
);

// Google OAuth callback route
app.get("/auth/google/secrets",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        res.redirect("/secrets");
    });

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/secrets", async (req, res) => {
    if (req.isAuthenticated()) {
        await User.find({ secret: { $ne: null } })
            .then((users) => res.render("secrets", { usersWithSecrets: users }));
    } else {
        res.redirect("/login");
    }
});

app.get("/submit", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("submit");
    } else {
        res.redirect("/login");
    }
});

app.get("/logout", (req, res) => {
    req.logout(function (err) {
        if (err) {
            console.error(err);
        }
        res.redirect("/");
    });
});

app.post("/register", (req, res) => {
    User.register({ username: req.body.username }, req.body.password, function (err, user) {
        if (err) {
            console.error(err);
            res.redirect("/register")
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secrets");
            });
        }
    });
});

app.post("/login", (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function (err) {
        if (err) {
            console.error(err);
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secrets");
            });
        }
    });
});

app.post("/submit", async (req, res) => {
    const submittedSecret = req.body.secret;

    // Once the user is authenticated and their session gets saved, their user details are saved to req.user
    // console.log(req.user)
    await User.findById(req.user.id)
        .then(async (user) => {
            if (user) {
                user.secret = submittedSecret;
                await user.save().then(() => res.redirect("/secrets"));
            }
        });
});

app.listen(port, () => {
    console.log(`App running at port ${port}`);
});