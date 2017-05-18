var mongoose = require("mongoose");
var Location = mongoose.model("Location");



var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
}
var theEarth = (function(){
    var earthRadius = 6371; // km, miles is 3959
    var getDistanceFromRads = function(rads) {
        return parseFloat(rads * earthRadius);
    };
    var getRadsFromDistance = function(distance) {
        return parseFloat(distance / earthRadius);
    };
    return {
        getDistanceFromRads : getDistanceFromRads,
        getRadsFromDistance : getRadsFromDistance
    };
})();

/**
*@api{get} /api/locations Get List of nearby locations
*@apiName GetLocations by distance
*@apiGroup Locations
*
*@apiSuccess {String} name The users name.
*@apiSuccess {String} age The users age
*
*@apiSuccessExample Example data on success:
*[
*  {
*    "distance": 0,
*    "name": "FriendShip",
*    "address": "Bole",
*    "rating": 3,
*    "facilities": [
*      "Hot drinks",
*      "Food"
*    ],
*    "_id": "591c19b85ea787b7da5e94ae"
*  }
*]
*/
var locationsListByDistance = (req, res)=>{
    var lat, lng;
    lng = parseFloat(req.query.lng);
    lat = parseFloat(req.query.lat);

    if(!lng && !lat){
        sendJsonResponse(res, 400, {"message" : "lat and lng were not specified"});
        return;
    }
    var point = {
        type : "Point",
        coordinates : [lng, lat]
    }
    var options = {
        spherical  : true,
        maxDistance : theEarth.getRadsFromDistance(20),
        num : 10
    }
    Location
        .geoNear(point, options, (err, results, stats) => {
            var locations = [];
            if(err){
                sendJsonResponse(res, 404, err);
                return;
            }
            results.forEach(function(doc) {
                locations.push({
                    distance: theEarth.getDistanceFromRads(doc.dis),
                    name: doc.obj.name,
                    address: doc.obj.address,
                    rating: doc.obj.rating,
                    facilities: doc.obj.facilities,
                    _id: doc.obj._id
                });
            });
            sendJsonResponse(res, 200, locations);
        })
}
var locationsCreate = (req, res)=>{
    sendJsonResponse(res, 200, {"message" : "created"});
}

/**
*@api{get} /api/locations/:locationid Get one location
*@apiName Get one location
*@apiGroup Locations
*
*@apiSuccess {String} name The users name.
*@apiSuccess {String} age The users age
*
*@apiSuccessExample Example data on success:
{
  "_id": "591c19b85ea787b7da5e94ae",
  "name": "FriendShip",
  "address": "Bole",
  "coords": [
    38.78217,
    8.99046
  ],
  "reviews": [
    {
      "author": "Henok Teklu",
      "_id": "591c1b6c5ea787b7da5e94af",
      "rating": 5,
      "timestamp": "2016-07-24T21:00:00.000Z",
      "reviewText": "What a greate place.",
      "createdOn": "2017-05-18T09:28:48.480Z"
    }
  ],
  "openingTimes": [
    {
      "days": "Monday - Friday",
      "opening": "7:00am",
      "closing": "7:00pm",
      "closed": false
    },
    {
      "days": "Saturday",
      "opening": "8:00am",
      "closing": "5:pm",
      "closed": false
    },
    {
      "days": "Sunday",
      "closed": true
    }
  ],
  "facilities": [
    "Hot drinks",
    "Food"
  ],
  "rating": 3
}
*/
var locationsReadOne = (req, res)=>{
    Location
        .findById(req.params.locationId)
        .exec((err, location)=>{
            if(!location){
                sendJsonResponse(res, 404, {
                    "message" : "No location Found"
                });
                return;
            }else if(err){
                sendJsonResponse(res, 404, {
                    "message" : "Not Found"
                });
                return;
            }
            sendJsonResponse(res, 200, location);
        });
}
var locationsUpdateOne = (req, res)=>{}
var locationsRemoveOne = (req, res)=>{}

module.exports = {
    locationsListByDistance,
    locationsCreate,
    locationsReadOne,
    locationsUpdateOne,
    locationsRemoveOne
}