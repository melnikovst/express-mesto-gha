module.exports.validateErrors = (string, object, code) => {
  if (code === '500') {
    object.status(code).send({ message: `${string}` });
    return;
  }
};
