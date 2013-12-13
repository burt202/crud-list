var mongodb = require('mongodb');

var GenresService = function (db) {
	this.db = db;

	this.getGenres = function (callback) {
		this.db.collection('genres', function(err, collection) {
			collection.find().toArray(function(err, data) {
				callback(data);
			});
		});
	};

	this.deleteGenre = function (id, callback) {
		this.db.collection('genres', function(err, collection) {
			collection.remove({_id: new mongodb.ObjectID(id)}, function(err, numberOfRemovedDocs) {
				callback();
			});
		});
	};
};

module.exports = GenresService;