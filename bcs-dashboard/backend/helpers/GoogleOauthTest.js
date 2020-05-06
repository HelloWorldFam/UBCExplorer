const GoogleOauth20Strategy = require("passport-google-oauth20");
const Users = require("../models/users.model");
module.exports = new GoogleOauth20Strategy(
  {
    clientID:
      "610240877212-f8024mt2n5gpc599ljnbv6n3fi0luevi.apps.googleusercontent.com",
    clientSecret: "GV5YeO-Rm8r3fH6etv3nddjx",
    callbackURL: "http://localhost:3000/auth/google/callback",
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