const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');

const tourRouter = express.Router();

// tourRouter.param('id', tourController.checkID);
tourRouter.route('/tour-stats').get(tourController.getTourStats);

tourRouter
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

tourRouter
  .route('/:id')
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead_guide'),
    tourController.deleteTour,
  )
  .get(tourController.getTour);

module.exports = tourRouter;
