var mongoose = require('mongoose');
var Location = mongoose.model('Location');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
}

var reviewsCreate = ()=>{

}
var reviewsReadOne = (req, res)=>{
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
var reviewsUpdateOne = ()=>{}
var reviewsRemoveOne = ()=>{}

module.exports = {
    reviewsCreate,
    reviewsReadOne,
    reviewsUpdateOne,
    reviewsRemoveOne
}
    