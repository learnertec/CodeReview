const express  = require('express');

const router = express.Router();


// root index for v1 route like v1/

router.use('/posts',require('./posts'));
router.use('/users',require('./users'));

module.exports = router