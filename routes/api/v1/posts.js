const express  = require('express');
const router = express.Router();
const postApiController = require('../../../controllers/api/v1/post_api');

// root index for v1 route like v1/posts etc
router.get('/',postApiController.index);
router.delete('/:id',postApiController.destroy);


module.exports = router