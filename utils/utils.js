const NotFound = require('../customErrors/NotFound');

module.exports.notFoundHandler = () => {
  throw new NotFound('Ошибка в url. Проверьте правильность введённых данных');
};
