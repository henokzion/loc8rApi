var {Schema, model} = require("mongoose");

var openingTimesSchema = new Schema({
    days : {type: String, required: true},
    opening : String,
    closing : String,
    closed : {type: Boolean , required: true}
});

var reviewSchema = new Schema({
    author : String,
    rating : {type: Number, required: true, min : 0, max : 0},
    reviewText : String,
    createdOn : {type: Date, "default" : Date.now}
})

var locationSchema = new Schema({
    name : {type : String, required: true},
    address : String,
    rating : {type : Number, "default": 0, min: 0, max: 5},
    facilities : [String],
    coords : {type : [Number], index : '2dsphere'},
    openingTimes : [openingTimesSchema],
    reviews : [reviewSchema]
});

model('Location', locationSchema, 'locations')