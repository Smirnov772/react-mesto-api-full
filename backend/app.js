const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const errorHandler = require('./middlewares/error-handler');
const {
  validateRegisterBody,
  validateRegistration
} = require('./middlewares/validation');
const { createUser, login } = require('./conrollers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { NotFoundError } = require('./errors/index');
const auth = require('./middlewares/auth');

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(cors({
  origin: true,
  exposedHeaders: '*',
  credentials: true,
}));
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.use(requestLogger);

app.post('/signin', validateRegisterBody, login);
app.post('/signup', validateRegistration, createUser);

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

app.use((req, res, next) => {
  next(new NotFoundError('ресурс не найден'));
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {console.log(PORT)});
