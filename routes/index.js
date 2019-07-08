const express  = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

// console.log('router loaded');

router.get('/',homeController.home);

//diff btw exports and module express
module.exports = router;