const passport = require('passport');
const JwtStretegy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const env = require('./environment');

let opt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret
}

passport.use(new JwtStretegy(opt, function(jwt_payload, done) {
    User.findOne({id: jwt_payload._id}, function(err, user) {
        if (err) {
            console.log('Error in finding user in jwt');return;
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));


module.exports = passport;