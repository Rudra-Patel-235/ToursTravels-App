const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const express = require('express');
const morgan = require('morgan');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

// Global Middlewares
app.use(helmet());

const limiter = rateLimit({
  limit: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'too many requests, try again after some time!!!',
});
app.use('/api', limiter);

app.use(express.static(`${__dirname}/public`));
app.use(express.json());

// data sanitization against noSQL query injection
app.use(mongoSanitize());

// data sanitization against XSS
app.use(xss());

// preventing parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'price',
      'difficulty',
      'maxGroupSize',
    ],
  }),
);

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
app.use('/api/v1/reviews', reviewRouter);

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
