require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error');
const routes = require('./routes/index');
const apiLimiter = require('./config/rateLimiter');
const { MONGO_URI } = require('./config/config');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

const corsOptions = {
  credentials: true,
};

app.use(cors(corsOptions));
app.use(requestLogger);

app.use(apiLimiter);

app.use('/', routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

async function startTheServer() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  await app.listen(PORT, () => {
    console.log(`Сервер запущен на ${PORT} порту`);
  });
}

startTheServer();
