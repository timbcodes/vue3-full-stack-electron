var express = require('express');
var router = express.Router();
const corsPolicy = require('../middleware/CORS/cors');

/* Use the CORS middleware */
router.use(corsPolicy.corsMiddleware());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("API is online!");
});

module.exports = router;
