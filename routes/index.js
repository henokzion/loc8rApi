var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');

//locations
router.get('/locations', ctrlLocations.locationsListByDistance);
router.post('/locations', ctrlLocations.locationsCreate);
router.get('/locations/:locationId', ctrlLocations.locationsReadOne);
router.put('/locations/:locationId', ctrlLocations.locationsUpdateOne);
router.delete('/locations/:locationId', ctrlLocations.locationsRemoveOne);

//reviews
router.post('/locations/:locationId/reviews', ctrlReviews.reviewsCreate)
router.get('/locations/:locationId/reviews/:reviewId', ctrlReviews.reviewsReadOne);
router.put('/locations/:locationId/reviews/:reviewId', ctrlReviews.reviewsUpdateOne);
router.delete('/locations/:locationId/reviews/:reviewId', ctrlReviews.reviewsRemoveOne);

module.exports = router;
