const express  = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

// console.log('router loaded');

router.get('/',homeController.home);

router.use('/users', require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));

// set root index file path for api folder so that for api it look into api folder
router.use('/api',require('./api'));
//diff btw exports and module express
module.exports = router;