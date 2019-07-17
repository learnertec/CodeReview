const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use new strategy for google login
passport.use(new googleStrategy({
    clientID: "323048417130-73b82vl8npqslcjao2sr4dmebaoj21b6.apps.googleusercontent.com",
    clientSecret: "cmSYhcxFRgB324HGinFpcL3Z",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
   },
   // google give us the access token and if access token expires then we use refresh token to generate new access token
   function(accessToken,refreshToken,profile,done){
    //    profile contain user information so we match email with the database
    User.findOne({email: profile.emails[0].value}).exec(function(err,user){
        if(err){
                console.log('Error in google-strategy-passport',err);
                return;
             }
        console.log(profile);
        if(user){
            // if found set the user as req.user
            return done(null,user);
        }else{
            // if not found create the user and set it as req.user
          User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString('hex')
          },function(err,user){
              if(err){
                console.log('Error in creating user google-strategy-passport',err);
                return;
              }
           return done(null,user);
          })  
        }
    })
   }
));

module.exports = passport;