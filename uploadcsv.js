var csvParser = require('csv-parse'),
    fs = require('fs');

var mongoose = require('mongoose');
var Listings = mongoose.model('Listings');

var readCsvFile = function(){

    fs.readFile('./listings.csv', {
        encoding: 'utf-8'
    }, function(err, csvData) {
        if (err) {
            console.log(err);
        }

        csvParser(csvData, {
            delimiter: ','
        }, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                saveToMongo(data);
            }
        });
    });
};

var saveToMongo = function (data){

    var length = data.length;
    for(var i = 1; i< length; i++){
        var listing = data[i];
            var payload = {
                "id": parseInt(listing[0]),
                "status": listing[1],
                "street": listing[2],
                "price": parseInt(listing[3]),
                "bedrooms": parseInt(listing[4]),
                "bathrooms": parseInt(listing[5]),
                "sq_ft": parseInt(listing[6]),
                "lat": parseFloat(listing[7]),
                "lng": parseFloat(listing[8])
            };

        Listings.create(payload, function(err){
            if(err){console.log(err);}
        });
    }

};

exports.readCsv = readCsvFile();