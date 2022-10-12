/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error');
const NotFoundError = require('./middlewares/errors/notFoundError');
const routes = require('./routes/index');
const apiLimiter = require('./config/rateLimiter');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use(cors());
app.use(requestLogger);

app.use(apiLimiter);

app.use('/', routes);

app.all('*', (req, res, next) => {
    next(new NotFoundError('Текущий url не найден'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

async function startTheServer() {
    await mongoose.connect('mongodb://localhost:27017/moviesdb', {
        useNewUrlParser: true,
        useUnifiedTopology: false,
    });

    await app.listen(PORT, () => {
        console.log(`Сервер запущен на ${PORT} порту`);
    });
}

startTheServer();
