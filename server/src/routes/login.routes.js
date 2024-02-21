const express = require('express');
const router = express.Router();
const apiKeyCheck = require('../js/utils/api_check.utils');
const corsPolicy = require('../middleware/CORS/cors');
const securityController = require('../js/controllers/login.controller');

router.use(corsPolicy.corsMiddleware());
router.use(apiKeyCheck.authenticateKey);

router.post('/', securityController.login);

module.exports = router;