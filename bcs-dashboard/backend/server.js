const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Courses = require("./models/courses.model.js");
const Users = require("./models/users.model.js");
const passport = require("passport");
const cookieSession = require("cookie-session");
const findOrCreate = require("mongoose-findorcreate");
const GoogleOauth20Strategy = require("passport-google-oauth20");
const config = require("./config.js")

const path = require("path");
const keepDynoAwake = require("./helpers/keepDynoAwake");

const FacebookStrategy = require("passport-facebook").Strategy;

const GitHubStrategy = require("passport-github2").Strategy;

require("dotenv").config();

// server settings - make sure that your port doesn't conflict with the React port!
const app = express();
const port = process.env.PORT || 5000;
const hostname = config[process.env.NODE_ENV] || "http://localhost:5000"

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

// cookieSession config
app.use(
  cookieSession({
    maxAge: 7 * (24 * 60 * 60 * 1000), // One day in milliseconds
    keys: ["SOME TEMP PLACEHOLDER"], // secret key to hash cookie ;)
  })
);

app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

//Facebook Strategy config
const FacebookOauthProduction = new FacebookStrategy(
  {
    clientID: "2828647350596227",
    clientSecret: "afde4d264c365d946882ec076bf5d4cd",
    callbackURL: hostname + "/auth/facebook/callback",
    profileFields: ["id", "email", "first_name", "last_name", "photos"],
  },
  function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    Users.findOrCreate(
      { email: profile._json.email },
      {
        facebookId: profile._json.id,
        firstName: profile._json.first_name,
        lastName: profile._json.last_name,
        courses: [],
      },
      function (err, user) {
        user.picture = profile.photos[0].value;
        user.save();
        done(err, user.email);
      }
    );
  }
);

// Github strategy.
const GitHubOAuthProduction = new GitHubStrategy(
  {
    clientID: "Iv1.b83becaf95ef5ce1",
    clientSecret: "71b0cfc8bc19dcf09f5173f5a8949398022adffd",
    callbackURL: hostname + "/auth/github/callback",
    scope: ["user"],
  },
  function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    Users.findOrCreate(
      { email: profile.emails[0].value },
      {
        firstName: profile._json.name,
        lastName: "",
        courses: [],
      },
      function (err, user) {
        user.picture = profile._json.avatar_url;
        user.save();
        return done(err, user.email);
      }
    );
  }
);

const GoogleOauthProduction = new GoogleOauth20Strategy(
  {
    clientID:
      "610240877212-muh7g8rvb1pficemikp3r3vdfaobgo9f.apps.googleusercontent.com",
    clientSecret: "MpRbTT5AssctwpN0Id0GHIwe",
    callbackURL: hostname + "/auth/google/callback",
  },
  function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    Users.findOrCreate(
      { email: profile.emails[0].value },
      {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        courses: [],
      },
      function (err, user) {
        // Updates user picture upon each auth session
        user.picture = profile._json.picture;
        user.save();
        // auth complete
        return done(err, user.email);
      }
    );
  }
);

passport.use(FacebookOauthProduction);

passport.use(GitHubOAuthProduction);

passport.use(GoogleOauthProduction);

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

// passport.authenticate middleware is used here to authenticate the request for github
app.get(
  "/auth/github",
  passport.authenticate("github", {
    //scope: ["(no scope)"],
    scope: ["user:email"], // Used to specify the required data; we only want read-only access to public information
  })
);

// The middleware receives the data from Github and runs the function on Strategy config
app.get(
  "/auth/github/callback",
  passport.authenticate("github"),
  (req, res) => {
    console.log("Successfully logged in");
    res.redirect("/bcs/start");
  }
);

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
    res.redirect("/bcs/start");
  }
);

// passport.authenticate middleware is used here to authenticate the request
app.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: "email",
  })
);

// The middleware receives the data from Google and runs the function on Strategy config
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook"),
  (req, res) => {
    console.log("Successfully logged in");
    res.redirect("/bcs/start");
  }
);

// Ask about this - using this to retrieve user data from the Passport 'profile' object
app.get("/userdata", isUserAuthenticated, (req, res) => {
  Users.find({ email: req.user }, function (err, result) {
    console.log(result);
    res.send(result);
  });
});

app.get("/coursedata", (req, res) => {
  Courses.find({ code: req.params.code }, function (err, result) {
    res.send(result);
  });
});

// Secret route
app.get("/secret", isUserAuthenticated, (req, res) => {
  res.send("You have reached the secret route");
});

// Logout route
app.get("/bcs/logout", (req, res) => {
  req.logout();
  res.redirect("/bcs");
});

// Whitelists React app static assets.
// This is to get around isUserAuthenticated middleware on "/*" paths
app.get("/static", (req, res) => {
  // send landing page
  res.redirect("/");
});
app.get("/node_modules", (req, res) => {
  // send landing page
  res.redirect("/");
});

app.get("/api", (req, res) => {
  // send landing page
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.get("/privacypolicy", (req, res) => {
  // send landing page
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.get("/contact", (req, res) => {
  // send landing page
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

// Nodemon success message
app.listen(port, () => {
  // Only keep dyno awake in production
  if (process.env.NODE_ENV === "production") {
    console.log("keepDynoAwake is running");
    keepDynoAwake("https://ubcexplorer.io/secret");
  }
  console.log(`Server is running on port: ${port}`);
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "..", "build/")));

//when connect to server, go up one directory into build folder
app.get("/", (req, res) => {
  // send landing page
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.get("/bcs", (req, res) => {
  // send landing page
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.get("/about", (req, res) => {
  // send landing page
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.get("/getCourses", isUserAuthenticated, (req, res) => {
  Users.find({ email: req.user }, function (err, result) {
    res.send(result[0].courses);
  });
});

app.get("/getAllCourses", (req, res) => {
  Courses.find()
    .then((courses) => res.send(courses))
    .catch((err) => console.log(err));
});

// To query a specific course from courses database
app.get("/getCourseInfo/:code", (req, res) => {
  Courses.findOne({ code: req.params.code })
    .then((course) => {
      if (course === null) res.send("Course not found");
      else res.send(course);
    })
    .catch((err) => {
      res.send("An error has occurred: " + err);
      console.log(err);
    });
});

// Search courses
app.get("/searchAny/:code", (req, res) => {
  Courses.find({ code: { $regex: req.params.code, $options: "i" } })
    .then((course) => {
      if (course.length === 0) res.send("Course not found");
      else res.send(course.slice(0, 8));
    })
    .catch((err) => {
      res.send("An error has occurred: " + err);
      console.log(err);
    });
});

// Update course worklist/array of the term objects which was selected in course selector
app.post("/updateUserWorkList", isUserAuthenticated, (req, res) => {
  Users.findOne({ email: req.user })
    .then((user) => {
      user.courses = req.body;
      user
        .save()
        .then(() => res.sendStatus(200))
        .catch((err) => {
          console.log(err);
          res.sendStatus(400);
        });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

// Update course worklist/array of the term objects which was selected in course selector
app.post("/updateUser", isUserAuthenticated, (req, res) => {
  Users.findOne({ email: req.user }).then((user) => {
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user
      .save()
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  });
});

app.post("/deleteUser", isUserAuthenticated, (req, res) => {
  Users.findOne({ email: req.user }).then((user) => {
    user
      .delete()
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  });
});

// Download user data to JSON
const fs = require("fs");
app.get("/downloadUserData", isUserAuthenticated, (req, res) => {
  Users.findOne({ email: req.user }).then((user) => {
    const data = user;
    fs.writeFile("userdata.json", data, function (error) {
      if (error) throw error;
      console.log("Write to userdata.json successfully!");
    });
    res.attachment("userdata.json");
    res.status(200).send(data);
  });
});

// Print Grad Check
const GradCheck = require("./templates/GradCheck");
app.get("/printGradCheck", isUserAuthenticated, (req, res) => {
  Users.findOne({ email: req.user }).then((user) => {
    const data = GradCheck.GradCheck(
      user.firstName,
      user.lastName,
      user.courses
    );
    fs.writeFile("gradcheck.txt", data, function (error) {
      if (error) throw error;
      console.log("Write to gradcheck.txt successfully!");
    });
    res.attachment("gradcheck.txt");
    res.status(200).send(data);
  });
});

app.get("/course/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

// Commented out for testing
app.get("/*", isUserAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

// // No authentication - for testing only!
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../build/index.html"));
// });
