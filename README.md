# opendoor
#Run
1. **npm install** to install all the dependecies first. 
2. **npm start** in the command line console.

**Note:** When running the app for the first time don't uncomment line 29 in server.js(require('./uploadcsv')). That line uploads the data of the csv file(listings.csv) into a mongodb database. 
When the uploading is done, the line should be commented out, to prevent duplicate entries in the database.
to run the app type npm start in the command line console.

##Improvements
1. Create a front end ui for users to make query selections themselves. E.g number of bedrooms, bathrooms, etc.
2. Paginated the response from the api(Json)
3. Query by square foot
