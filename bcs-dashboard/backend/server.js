const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Courses = require("./models/courses.model");
const Departments = require("./models/departments.model");
const passport = require("passport");
const cookieSession = require("cookie-session");
const findOrCreate = require("mongoose-findorcreate");
const FacebookStrategy = require("passport-facebook");
const GoogleOauth20Strategy = require("passport-google-oauth20");
const TwitterStrategy = require("passport-twitter");
const path = require("path");

require("dotenv").config();

// server settings - make sure that your port doesn't conflict with the React port!
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB configuration
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const { Schema } = mongoose;
const UsersSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  picture: String,
  courses: Array,
}).plugin(findOrCreate);
const Users = mongoose.model("Users", UsersSchema);

// cookieSession config
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    keys: ["SOME TEMP PLACEHOLDER"], // secret key to hash cookie ;)
  })
);

app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

// Strategy config
// passport.use(new FacebookStrategy({
//   clientID: 'must sign up with facebook for one',
//   clientSecret: 'must sign up with facebook for one',
//   callbackURL: 'our callback URL'
// },
//   function (accessToken, refreshToken, profile, done) {
//     Users.findOrCreate({ email: profile.email }, { firstName: profile.firstName, lastName: profile.lastName }, function (err, user) {
//       return done(err, user);
//     })
//   }));

passport.use(
  new GoogleOauth20Strategy(
    {
      clientID:
        "610240877212-muh7g8rvb1pficemikp3r3vdfaobgo9f.apps.googleusercontent.com",
      clientSecret: "MpRbTT5AssctwpN0Id0GHIwe",
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      Users.findOrCreate(
        { email: profile.emails[0].value },
        {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          picture: profile._json.picture,
        },
        function (err, user) {
          return done(err, user);
        }
      );
    }
  )
);

// passport.use(new TwitterStrategy({
//   clientID: 'must sign up with facebook for one',
//   clientSecret: 'must sign up with facebook for one',
//   callbackURL: 'our callback URL'
// },
//   function (accessToken, refreshToken, profile, done) {
//     Users.findOrCreate({ email: profile.email }, { firstName: profile.firstName, lastName: profile.lastName }, function (err, user) {
//       return done(err, user);
//     })
//   }));

// Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.send("You must login!");
  }
}

// passport.authenticate middleware is used here to authenticate the request
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"], // Used to specify the required data; we only want read-only access to public information
  })
);

// The middleware receives the data from Google and runs the function on Strategy config
app.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    console.log("Successfully logged in");
    res.redirect("/dashboard");
  }
);

// Ask about this - using this to retrieve user data from the Passport 'profile' object
app.get("/userdata", isUserAuthenticated, (req, res) => {
  Users.find({ email: req.user.email }, function (err, result) {
    res.send(result);
  });
});

// Secret route
app.get("/secret", isUserAuthenticated, (req, res) => {
  res.send("You have reached the secret route");
});

// Logout route
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Nodemon success message
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// Serve static files from the React app
app.use(express.static("../build/"));

//when connect to server, go up one directory into build folder
app.get("/", (req, res) => {
  // send landing page
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.get("/getCourses", (req, res) => {
  if (!req.user) {
    res.send("You are not authenticated.");
  } else {
    Users.find({ email: req.user.email }, function (err, result) {
      res.send(result[0].courses);
    });
  }
});

app.get("/getAllCourses", isUserAuthenticated, (req, res) => {
  if (!req.user) {
    res.send("You are not authenticated.");
  } else {
    Courses.find()
      .then((courses) => res.send(courses))
      .catch((err) => console.log(err));
  }
});

app.get("/getDepartments", isUserAuthenticated, (req, res) => {
  if (!req.user) {
    res.send("You are not authenticated.");
  } else {
    Departments.find()
      .then((courses) => res.send(courses))
      .catch((err) => console.log(err));
  }
});

// To query a specific course from courses database
app.get("/getCourseInfo/:code", (req, res) => {
  Courses.findOne({ code: req.params.code })
    .then((course) => res.send(course))
    .catch((err) => console.log(err));
});

//Update course worklist/array of the term objects which was selected in course selector
app.post("/updateUserWorkList", isUserAuthenticated, (req, res) => {
  Users.find({ email: req.user.email }).then((user) => {
    console.log(req.body);
    user.courses = req.body;
  });
  res.sendStatus(200);
});

// Commented out for testing
// app.get("/*", isUserAuthenticated, (req, res) => {
//   res.sendFile(path.join(__dirname, "../build/index.html"));
// });

// No authentication - for testing only!
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});
