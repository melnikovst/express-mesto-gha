const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const userRouter = require('./routes/userRouter');
const cardRouter = require('./routes/cardRouter')

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '63415e20e6ce48991e929c1e',
  };

  next();
});

app.use(bodyParser.json());
app.use(userRouter);
app.use(cardRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
