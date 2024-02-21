const express = require('express');
const router = express.Router();
const apiKeyCheck = require('../js/utils/api_check.utils');
const corsPolicy = require('../middleware/CORS/cors');
const emailHandler = require('../js/handlers/email.handler');
const authenticate = require('../js/handlers/auth.handler');
const securityController = require('../js/controllers/security.controller');

router.use(corsPolicy.corsMiddleware());
router.use(apiKeyCheck.authenticateKey);

router.post('/send_security_email', emailHandler.sendSecurityEmail);
router.post('/reset_password', securityController.resetPassword);
router.post('/verify_reset_token', securityController.verifyResetToken);
router.post('/check_password', authenticate, securityController.checkPassword);
router.post('/change_password', authenticate, securityController.changePassword);
router.post('/check_existing_email', authenticate, securityController.checkExistingEmail);

module.exports = router;