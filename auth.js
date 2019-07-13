const jwt = require('jsonwebtoken');
// const config = require('config');

module.exports = function (req, res, next) {
  // const token = req.header('x-auth-token');
  const { token } = req.cookies;
  console.log(req.cookies);
  if (!token) return res.status(401).send('Access denied. No token provided. from auth');

  try {
    const decoded = jwt.verify(token, 'wtfomgbbq');
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};
