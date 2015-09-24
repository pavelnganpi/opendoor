var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListingsSchema = new Schema({

    id: Number,
    status: String,
    street: String,
    price: Number,
    bedrooms: Number,
    bathrooms: Number,
    sq_ft: Number,
    lat: Number,
    lng: Number
});

mongoose.model('Listings', ListingsSchema);