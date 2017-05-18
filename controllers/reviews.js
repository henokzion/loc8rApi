var mongoose = require('mongoose');
var Location = mongoose.model('Location');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
}

function doAddReview(req, res, location){
    if(!location){
        sendJsonResponse(res, 404, {
            "message" : "location not found"
        });
        return;
    }
    console.log(location.reviews.length);
    location.reviews.push({
        author : req.body.author,
        rating: req.body.rating,
        reviewText: req.body.reviewText
    });
    location.save((err, result)=>{
        if(err){
            sendJsonResponse(res, 400, err);
            return;
        }
        updateAverageRating(location._id);
        thisReview = location.reviews[location.reviews.length - 1];
        sendJsonResponse(res, 201, thisReview);
    });
}

var updateAverageRating = function(locationid) {
    Location
        .findById(locationid)
        .select('rating reviews')
        .exec(function(err, location) {
            if (!err) {
                doSetAverageRating(location);
            }
        });
};
var doSetAverageRating = function(location) {
    var i, reviewCount, ratingAverage, ratingTotal;
    if (location.reviews && location.reviews.length > 0) {
        reviewCount = location.reviews.length;
        ratingTotal = 0;
        for (i = 0; i < reviewCount; i++) {
            ratingTotal = ratingTotal + location.reviews[i].rating;
        }
        ratingAverage = parseInt(ratingTotal / reviewCount, 10);
        location.rating = ratingAverage;
        location.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Average rating updated to", ratingAverage);
        }
        }); 
    }
};

var reviewsCreate = (req, res)=>{
    Location
        .findById(req.params.locationId)
        .select('rating reviews')
        .exec((err, location)=>{
            if(err){
                sendJsonResponse(res, 404, {
                    "message" :"couldn't find the location specefied"
                });
                return;
            }
            doAddReview(req, res, location);
        })
}

var reviewsReadOne = (req, res)=>{
    Location
        .findById(req.params.locationId)
        .select('name reviews')
        .exec((err, location)=>{
            var review, response;
            if(!location){
                sendJsonResponse(res, 404, {
                    "message" : "location Not Found"
                });
                return;
            }else if(err){
                sendJsonResponse(res, 404, err);
                return;
            }
            if(location.reviews && location.reviews.length > 0){
                review = location.reviews.id(req.params.reviewId);
                if(!review){
                    sendJsonResponse(res, 404, {
                        "message" : "Review Not Found"
                    });
                    return;
                }
                response = {
                    location : {
                        name : location.name,
                        id : req.params.locationId
                    },
                    review
                }
                sendJsonResponse(res, 200, response);
            }else {
                sendJsonResponse(res, 404, {
                    "message": "No reviews found"
                });
            }
        })
}
var reviewsUpdateOne = (req, res)=>{
Location
        .findById(req.params.locationId)
        .select('name reviews')
        .exec((err, location)=>{
            var review, response;
            console.log(location.reviews);
            if(!location){
                sendJsonResponse(res, 404, {
                    "message" : "location Not Found"
                });
                return;
            }else if(err){
                sendJsonResponse(res, 404, err);
                return;
            }
            if(location.reviews && location.reviews.length > 0){
                review = location.reviews.id(req.params.reviewId);
                if(!review){
                    sendJsonResponse(res, 404, {
                        "message" : "Review Not Found"
                    });
                    return;
                }
                review.author = req.body.author;
                review.rating = req.body.rating;
                review.reviewText = req.body.reviewText;
                location.save((err, location)=>{
                    if(err){
                        sendJsonResponse(res, 404, {
                            "message" : "not saved"
                        });
                        return;
                    }
                    updateAverageRating(location._id);
                    sendJsonResponse(res, 200, review);
                })
            }else {
                sendJsonResponse(res, 404, {
                    "message": "No reviews found"
                });
            }
        })
}
var reviewsRemoveOne = (req, res)=>{
    Location
        .findById(req.params.locationId)
        .select('name reviews')
        .exec((err, location)=>{
            var review, response;
            console.log(location.reviews);
            if(!location){
                sendJsonResponse(res, 404, {
                    "message" : "location Not Found"
                });
                return;
            }else if(err){
                sendJsonResponse(res, 404, err);
                return;
            }
            if(location.reviews && location.reviews.length > 0){
                review = location.reviews.id(req.params.reviewId);
                if(!review){
                    sendJsonResponse(res, 404, {
                        "message" : "Review Not Found"
                    });
                    return;
                }
                review.remove();
                location.save((err, location)=>{
                    if(err){
                        sendJsonResponse(res, 404, {
                            "message" : "not saved"
                        });
                        return;
                    }
                    updateAverageRating(location._id);
                    sendJsonResponse(res, 204, null);
                })
            }else {
                sendJsonResponse(res, 404, {
                    "message": "No reviews found"
                });
            }
        })
}

module.exports = {
    reviewsCreate,
    reviewsReadOne,
    reviewsUpdateOne,
    reviewsRemoveOne
}
    