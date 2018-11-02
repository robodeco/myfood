// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20');
// const keys = require('./keys');
//
// passport.use(
//   new GoogleStrategy({
//     //options for google strategy
//     callbackURL: '/auth/google/redirect',
//     clientID: keys.google.clientID,
//     clientSecret: keys.google.clientSecret
//   }, (accessToken, refreshToken, profile, done) => {
//     //passport callback function
//     console.log("passport callback function");
//     console.log(profile);
//
//   })
// )


const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('./keys');
const db = require('../models');




passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    db.User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        //options for google strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
      }, (accessToken, refreshToken, profile, done) => {
        //passport callback function
        console.log("passport callback function");
        console.log(typeof profile.id);
        db.User.findOne({
          googleId: profile.id
        }).then((currentUser) => {
          if (currentUser) {
            // already have this user
            console.log('user is: ', currentUser);
            done(null, currentUser);
          } else {
            // if not, create user in our db
            new db.User({
              googleId: profile.id,
              username: profile.displayName
            }).save().then((newUser) => {
              console.log('created new user: ', newUser);
              done(null, newUser);
            });
          }
        })
      })
    );

//Alex FB additions. delete from here down if broken
passport.use(
  new FacebookStrategy({
  clientID: keys.facebook.clientID,
  clientSecret: keys.facebook.clientSecret,
  callbackURL: " https://myfoodgw.herokuapp.com/",
  profileFields: ['id','displayName', 'photos', 'email']
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    db.User.findOne({
      googleId: profile.id
    }).then((currentUser) => {
      if (currentUser) {
      console.log('user is ', currentUser);
      done(null, currentUser);
    } else {
      new db.User({
        googleId: profile.id,
        username: profile.displayName
      }).save().then((newUser) => {
        console.log('created new user: ', newUser);
        done(null, newUser);
      })
    }
  })
})
);


module.exports = passport;
