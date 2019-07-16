const express  = require('express');

const router = express.Router();
const usersApiController = require('../../../controllers/api/v1/users_api');

// root index for v1 route like v1/

router.post('/create-session',usersApiController.createSession)

module.exports = router