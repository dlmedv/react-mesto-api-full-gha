const jwt = require('jsonwebtoken');

const signToken = (payload) => jwt.sign(payload, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

module.exports = {
  signToken,
};
