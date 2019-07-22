const express = require('express');
const likesController = require('../controllers/likes_controller');
const router = express.Router();


router.get('/toggle',likesController.toggleLike);


module.exports = router;