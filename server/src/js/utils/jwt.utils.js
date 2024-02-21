const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const generateJWT = (userObject) => {
  const payload = {
    ...userObject,
    issuer: 'borderlandsoftware.com',
  };

  const token = jwt.sign(payload, secret, { algorithm: 'HS256' });
  return token;
};

const verifyJWT = (token) => {
  try {
    const decoded = jwt.verify(token, secret, { algorithm: 'HS256' });
    return decoded;
  } catch (error) {
    return null; // Token verification failed
  }
};

module.exports = {
  generateJWT,
  verifyJWT,
};
