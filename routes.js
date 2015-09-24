module.exports = function(app){
    var listings = require('./controllers/listings');
    app.get('/listings', listings.getAll);
};