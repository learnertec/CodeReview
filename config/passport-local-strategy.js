const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

// authentication using passport
passport.use(new LocalStrategy({
  usernameField: 'email' ,
//   It is used to access the req object so that e can set the flash
  passReqToCallback: true 
},
function(req,email, password, done){
  User.findOne({email: email},function(err,user){ 
      if(err){
          req.flash('error',err);
          return done(err);
      }
   
      if(!user || user.password != password){
         req.flash('error','Invalid User / Password');
          return done(null,false);
      }
       return done(null,user);
  })
}
));

//serializing the user to decide which key is kept to be in cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})

//deserializing the user from key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){
            console.log('Error in finding  use ==> passport');
            return done(err);
        }
        return done(null,user);
    })
})

//check if user is authenticated
passport.checkAuthentication = function(req,res,next){
    // if user is signed in passed on request to next function (controller action)
  if (req.isAuthenticated()){
      return next();
  }
//   if user is not signed in
  return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = function(req,res,next){
    if (req.isAuthenticated()){
    // req.user contain current signin user from the session cookie and we are sending to locals views
        res.locals.user = req.user
    }
    next();
}     

module.exports = passport;