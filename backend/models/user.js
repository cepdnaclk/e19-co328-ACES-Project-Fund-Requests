const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const mongoose = require("mongoose");
const User = require("./models/user"); // Replace with your user model
const app = express();

// MongoDB connection setup
mongoose.connect("mongodb://localhost/your-db-name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);

// Express session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Configure the Google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: "YOUR_CLIENT_ID",
      clientSecret: "YOUR_CLIENT_SECRET",
      callbackURL: "http://localhost:3000/auth/google/callback", // Update with your callback URL
    },
    async (accessToken, refreshToken, profile, done) => {
      // Check if the user already exists in your database
      let user = await User.findOne({ googleId: profile.id });

      if (user) {
        return done(null, user);
      }

      // If the user doesn't exist, create a new user in your database
      user = new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      });

      await user.save();
      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Routes
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect or respond as needed
    res.redirect("/");
  }
);

// Add your other routes and server setup here

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
