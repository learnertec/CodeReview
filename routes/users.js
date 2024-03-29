const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');


router.get('/profile/:id',passport.checkAuthentication,usersController.profile);

router.get('/sign-in',usersController.signIn);

router.get('/sign-up',usersController.signUp);

router.post('/create',usersController.create);
router.post('/update/:id',passport.checkAuthentication,usersController.update);

router.get('/sign-out',usersController.signOut);

//use passport to authenticate
router.post('/create-session', passport.authenticate('local',{failureRedirect: '/users/sign-in'}),usersController.createSession);

// /auth/google is given by the passport
router.get('/auth/google',passport.authenticate('google',{scope: ['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: '/users/sign-in'}),usersController.createSession);

module.exports = router;