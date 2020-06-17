const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

// This middleware always check for id
//router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour); // chained middleware
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
