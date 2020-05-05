const GoogleOauth20Strategy = require("passport-google-oauth20");
module.exports = new GoogleOauth20Strategy(
    {
      clientID:
        "610240877212-muh7g8rvb1pficemikp3r3vdfaobgo9f.apps.googleusercontent.com",
      clientSecret: "MpRbTT5AssctwpN0Id0GHIwe",
      callbackURL: "https://ubcexplorer.io/auth/google/callback",
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
          return done(err, user);
        }
      );
    }
  );