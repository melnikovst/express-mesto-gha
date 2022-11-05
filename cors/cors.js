/* eslint-disable consistent-return */
const allowedCors = [
  'https://melnikovst.mesto.nomoredomains.icu/',
  'http://melnikovst.mesto.nomoredomains.icu/',
  'localhost:3000',
];

module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  const { origin } = req.headers;
  res.header('Access-Control-Allow-Credentials', true);
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
};
