const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');
const reviewRouter = require('./reviewRoutes');

const tourRouter = express.Router();

// tourRouter.param('id', tourController.checkID);
tourRouter.route('/tour-stats').get(tourController.getTourStats);

tourRouter
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour,
  );

tourRouter
  .route('/:id')
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead_guide'),
    tourController.updateTour,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead_guide'),
    tourController.deleteTour,
  )
  .get(tourController.getTour);

// tourRouter
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.CreateReview,
//   );

tourRouter.use('/:tourId/reviews', reviewRouter);

module.exports = tourRouter;
