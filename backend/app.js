require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const NotFound = require('./errors/NotFound');
const usersController = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorMiddlewares = require('./middlewares/errorMiddlewares');
const { validateSignIn, validateSignUp } = require('./middlewares/validations');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();
app.use(cors());

mongoose.connect(DB_ADDRESS, {});

app.use(helmet());
app.use(express.json());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateSignIn, usersController.loginUser);
app.post('/signup', validateSignUp, usersController.createUser);

app.use(auth);
app.use(usersRouter);
app.use(cardsRouter);

app.use('*', (req, res, next) => next(new NotFound('По этому адресу ничего нет')));

app.use(errorLogger);
app.use(errors());
app.use(errorMiddlewares);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
