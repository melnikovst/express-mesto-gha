const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const parser = require('cookie-parser');
const { errors } = require('celebrate');
const testCorsLib = require('cors');

const { PORT = 3000 } = process.env;
const app = express();
const userRouter = require('./routes/userRouter');
const cardRouter = require('./routes/cardRouter');
const { notFoundHandler } = require('./utils/utils');
/* const { ver } = require('./middlewares/auth'); */
const { postProfile } = require('./controllers/user');
const { login } = require('./controllers/login');
const { validateSignup, validateSignin, handleErrors } = require('./middlewares/error');
/* const { cors } = require('./cors/cors'); */
const { requestLogger, errorLogger } = require('./middlewares/loggers');

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(bodyParser.json());
app.use(requestLogger);
/* app.use(cors); */

app.use(testCorsLib());
app.post('/signup', validateSignup, postProfile);
app.post('/signin', validateSignin, login);

app.use(parser());
/* app.use(ver); */

app.use(userRouter);
app.use(cardRouter);

app.use(errorLogger);
app.use(notFoundHandler);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
