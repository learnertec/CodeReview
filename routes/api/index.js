const express  = require('express');

const router = express.Router();

// root index for api route like api/v1/

router.use('/v1',require('./v1'));

module.exports = router