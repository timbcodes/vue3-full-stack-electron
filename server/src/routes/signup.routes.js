const express = require('express');
const router = express.Router();
const apiKeyCheck = require('../js/utils/api_check.utils');
const corsPolicy = require('../middleware/CORS/cors');
const userSignupController = require('../js/controllers/signup.controller');

router.use(corsPolicy.corsMiddleware());
router.use(apiKeyCheck.authenticateKey);

router.post('/create_user', userSignupController.createUser);

module.exports = router;