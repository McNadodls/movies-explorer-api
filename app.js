require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000, CONNECT_DB, NODE_ENV } = process.env;

const app = express();

const cors = require('cors');
const cookieParser = require('cookie-parser');
const { options } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(cors({ credentials: true, origin: 'mcnad.movie.nomoredomainsclub.ru' }));

// подключене к базе
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.set('strictQuery', false);
mongoose.connect(NODE_ENV === 'production' ? CONNECT_DB : 'mongodb://0.0.0.0:27017/mestodb');

app.use(cookieParser());
app.use(requestLogger);

// Роуты
app.use('/', require('./routes/index'));

app.use(errorLogger);

app.use(require('./errors/centralizedErrorHandling'));

app.listen(PORT);
