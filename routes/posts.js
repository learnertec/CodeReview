const express = require('express');
const postsController = require('../controllers/posts_controller');
const router = express.Router();
const passport = require('passport');


router.post('/create',passport.checkAuthentication,postsController.create);
// In ajax javascript we call the method delete but here we use get 
router.get('/destroy/:id',passport.checkAuthentication,postsController.destroy);

 module.exports = router;
