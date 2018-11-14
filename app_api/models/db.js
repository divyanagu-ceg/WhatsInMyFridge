var mongoose = require( 'mongoose' );
var dbURI = 'mongodb://localhost/dnFridge';

/*if(process.env.NODE_ENV == 'production'){
	dbURI = 'mongodb://admin:admin92@ds123003.mlab.com:23003/divyan'
}*/
console.log("In db.js");
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
console.log('Success!! Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error',function (err) {
console.log('Error!! Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
console.log('Mongoose disconnected');
});

require('./food');