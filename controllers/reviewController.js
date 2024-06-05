const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const handler = require('./commonHandler');

exports.getAllReviews = handler.getAll(Review);
// exports.getAllReviews = catchAsync(async (req, res, next) => {
//   let Obj = {};
//   if (req.params.tourId) Obj = { tour: req.params.tourId };
//   const allReviews = await Review.find(Obj);

//   res.status(200).json({
//     status: 'success',
//     results: allReviews.length,
//     data: {
//       allReviews,
//     },
//   });
// });

// exports.createReview = catchAsync(async (req, res, next) => {
//   // allowing nested routes
//   if (!req.body.tour) req.body.tour = req.params.tourId;
//   if (!req.body.user) req.body.user = req.user.id;

//   const newReview = await Review.create(req.body);

//   res.status(201).json({
//     status: 'success',
//     data: {
//       review: newReview,
//     },
//   });
// });

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
exports.createReview = handler.createOne(Review);
exports.getReview = handler.getOne(Review);
exports.deleteReview = handler.deleteOne(Review);
exports.updateReview = handler.updateOne(Review);
