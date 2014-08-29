var http = require('http')
	, express = require('express')
  	, app = express()
  	, mongodb = require('mongodb').MongoClient
  	;

// tarjoile tiedostoja public-hakemistosta
app.use(express.static(__dirname + '/public'));

app.get("/cars", function(req, res) {
	mongodb.connect('mongodb://localhost:27017/testapp', function(err, db) {
		db.collection("cars", function(err, collection) {
			collection.find().toArray(function(err, data) {
				res.status(200).send(data);
			})
		});
	});
})

var server = app.listen(8081, function() {
    console.log('Listening on port %d', server.address().port);
});
