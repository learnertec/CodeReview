const express  = require('express');
const router = express.Router();
const passport = require('passport');
const postApiController = require('../../../controllers/api/v1/post_api');

// root index for v1 route like v1/posts etc
router.get('/',postApiController.index);
router.delete('/:id',passport.authenticate('jwt',{session: false}),postApiController.destroy);


module.exports = router