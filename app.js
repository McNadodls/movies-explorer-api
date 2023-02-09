/* Импорты */
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet'); // пакет helmet (security)
const cookieParser = require('cookie-parser');
const cors = require('cors');
/* Middlewares */
const { limiter } = require('./middlewares/limiter');
const { replaceMnemonics } = require('./middlewares/replaceMnemonics');
const { options } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
/* env */
require('dotenv').config();
// обращение к файлу .env
const { PORT = 3000, CONNECT_DB, NODE_ENV } = process.env; // Забираем из .env

const app = express();

/*
 * Используем модуль cors чтобы разрешить кроссдоменные запросы
 * Опции в отдельном файле
 */
app.use(cors({ credentials: true, origin: 'https://mcnad.movie.nomoredomainsclub.ru'}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Подключение к DB */
mongoose.connect(NODE_ENV === 'production' ? CONNECT_DB : 'mongodb://0.0.0.0:27017/moviesdb');

/* Logs */
app.use(requestLogger);

/* Security */
app.use(limiter);
app.use(helmet());

/* Cookie */
app.use(cookieParser());

/* Подастановка мнемоник escapeHTML */
app.use(replaceMnemonics);

/* Роуты */
app.use('/', require('./routes/index'));

/* Logs */
app.use(errorLogger);

/* Центральный обработчик ошибок */
app.use(require('./errors/centralErrorHandling'));

app.listen(PORT);
