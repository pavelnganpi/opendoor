var mongoose = require('mongoose');
var Listings = mongoose.model('Listings');
var GeoJSON = require('geojson');

exports.getAll = function(req, res){

    var query = req.query;
    var min_bath = query.min_bath? query.min_bath : 0;
    var max_bath = query.max_bath? query.max_bath : 200;//assuming the max number of possible bathrooms is 200
    var min_price = query.min_price ? query.min_price : 1;
    var max_price = query.max_price ? query.max_price : Number.POSITIVE_INFINITY;
    var min_bed = query.min_bed ? query.min_bed : 0; //assuming the min number of possible bedrooms is 0
    var max_bed = query.max_bed ? query.max_bed :200; //assuming the max number of possible bedrooms is 200
    Listings.find({})
        .where('bathrooms').gte(min_bath).lte(max_bath)
        .where('price').gte(min_price).lte(max_price)
        .where('bedrooms').gte(min_bed).lte(max_bed)
        .exec(function(err, data){

            var data3 = [];

            for(var i =0; i < data.length; i++){
                var temp = {
                    id: data[i].id,
                    status: data[i].status,
                    street: data[i].street,
                    price: data[i].price,
                    bedrooms: data[i].bedrooms,
                    bathrooms: data[i].bathrooms,
                    sq_ft: data[i].sq_ft,
                    lat: data[i].lat,
                    lng: data[i].lng
                };
                data3.push(temp);
            }

            var result = GeoJSON.parse(data3, {Point: ['lat', 'lng']});
            for(var i =0; i < data.length; i++){
                console.log(result.features[i].properties);
            }
            res.send(result);
            return result;
        });
};
