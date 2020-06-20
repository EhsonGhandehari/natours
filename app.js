const express = require('express');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); // this is the middleware
app.use(express.static(`${__dirname}/public`)); //access to static files

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Mounting the Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Middleware handling routes that do not exist.
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404)); // Whatever we pass inside next() it would be assumed that is an error
});

app.use(globalErrorHandler);

module.exports = app;
