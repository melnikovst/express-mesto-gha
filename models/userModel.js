const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      validate: {
        validator: (value) => validator
          .isURL(value, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
        message: 'Must be a Valid URL',
      },
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      unique: true,
      required: 'Введённый адресс электронной почты не может быть пустым', /* строка true */
      type: String,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: 'Введён невалидный адрес электронной почты.',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { toObject: { useProjection: true }, toJSON: { useProjection: true } },
);

module.exports = mongoose.model('user', userSchema);
