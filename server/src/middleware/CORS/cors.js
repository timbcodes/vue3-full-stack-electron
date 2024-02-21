const cors = require('cors');

const corsPolicy = {
  corsMiddleware() {
    const corsOptions = {
      origin: function (origin, callback) {
        if (!origin || isOriginAllowed(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: ['Content-Type', 'x-api-key', 'Access-Control-Allow-Private-Network', 'Authorization'],
      preflightContinue: false,
      optionsSuccessStatus: 204,
    };
    return cors(corsOptions);
  },
};

function isOriginAllowed(origin) {
  return true;
}

module.exports = corsPolicy;