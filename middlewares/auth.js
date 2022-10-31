const token = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports.ver = (req, res, next) => {
  const { jwt } = req.cookies;
  console.log(jwt);
  if (!jwt) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  let payload;

  try {
    payload = token.verify(jwt, '6360540f025b93cbcf82932d');
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  next();
};
