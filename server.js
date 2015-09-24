
var express = require('express'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    bodyParser = require('body-parser');

var mongoUri = 'mongodb://localhost/openDoor';
var db = mongoose.connection;

db.on('error', function(){
    throw new Error('unable to connect to database at ' + mongoUri);
});

console.log(process.env.MONGOLAB_URI);

var app = express();
app.use(bodyParser.json());

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
    mongoose.connect(mongoUri);
}
if('production' == env){
    mongoose.connect('mongodb://heroku_mcr0bsmg:eq8avpd6ufpmr7947h386ghmpe@ds029217.mongolab.com:29217/heroku_mcr0bsmg');
}

require('./models/listing');
require('./routes')(app);
require('./uploadcsv');  // this uploads the data in the csv file into mongo.

app.listen(process.env.PORT || 3001);
