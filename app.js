const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const userRouter = require('./routes/userRouter');
const cardRouter = require('./routes/cardRouter');
const { notFoundHandler } = require('./utils/utils');

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, _, next) => {
  req.user = {
    _id: '634bce31422bf88c9224022f',
  };

  next();
});

app.use(bodyParser.json());
app.use(userRouter);
app.use(cardRouter);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
