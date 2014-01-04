var mongodb = require('mongodb');

var GenresService = function (db) {
	this.db = db;

	this.get = function (callback) {
		this.db.collection('genres', function(err, collection) {
			collection.find().toArray(function(err, data) {
				callback(data);
			});
		});
	};

	this.add = function (data, callback) {
		this.db.collection('genres', function(err, collection) {
			collection.insert({name: data.name}, function (err, result) {
				callback(data);
			});
		});
	};

	this.update = function (id, data, callback) {
		this.db.collection('genres', function(err, collection) {
			collection.update({_id: new mongodb.ObjectID(id)}, {name: data.name}, function (err, result) {
				callback(data);
			});
		});
	};

	this.delete = function (id, callback) {
		this.db.collection('genres', function(err, collection) {
			collection.remove({_id: new mongodb.ObjectID(id)}, function(err, numberOfRemovedDocs) {
				callback();
			});
		});
	};
};

module.exports = GenresService;