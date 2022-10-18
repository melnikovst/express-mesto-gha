module.exports.fixDoubles = (result, object) => {
  if (object.name === 'ValidationError') {
    result.status(400).send({ message: 'Валидация не пройдена, проверьте правильность введённых данных!' });
    return;
  }
  result.status(500).send({ message: 'Что-то пошло не так :(' });
};

module.exports.fixLikesDoubles = (result, object) => {
  if (object.name === 'CastError') {
    result.status(400).send({ message: 'Валидация не пройдена, проверьте правильность введённых данных!' });
    return;
  }
  result.status(500).send({ message: 'Что-то пошло не так :(' });
};

module.exports.notFoundHandler = (_, res) => {
  res.status(404).send({ message: 'Ошибка в url. Проверьте правильность введённых данных' });
};
