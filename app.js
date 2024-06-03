const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(express.static(`${__dirname}/public`));
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log('hello from middleware');
  // console.log(req.headers);
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

app.all('*', (req, res, next) => {
  er = new AppError(`can't find ${req.originalUrl} on this server`, 404);

  next(er);
});

// app.use((err, req, res, next) => {
//   err.statusCode = err.status || 500;
//   err.status = err.status || 'error';

//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//   });
// });

app.use(globalErrorHandler);
module.exports = app;

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', GetTour);
// app.post('/api/v1/tours', CreateTour);
// app.patch('/api/v1/tours/:id', UpdateTour);
// app.delete('/api/v1/tours/:id', DeleteTour);
