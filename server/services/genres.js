var mongodb = require('mongodb');

var GenresService = function (db) {
	this.db = db;

	this.validate = function (data) {
		var errors = [];

		if (data.name.length === 0) {
			errors.push({
				field: 'name',
				message: 'You must complete this field'
			});
		}

		return errors;
	};

	this.get = function (callback) {
		this.db.collection('genres', function(err, collection) {
			collection.find().toArray(function(err, data) {
				callback(data);
			});
		});
	};

	this.add = function (data, callback) {
		this.db.collection('genres', function(err, collection) {
			collection.insert(data, {safe: true}, function (err, result) {
				callback(result[0]);
			});
		});
	};

	this.update = function (id, data, callback) {
		this.db.collection('genres', function(err, collection) {
			collection.update({_id: new mongodb.ObjectID(id)}, data, function () {
				callback(data);
			});
		});
	};

	this.remove = function (id, callback) {
		this.db.collection('genres', function(err, collection) {
			collection.remove({_id: new mongodb.ObjectID(id)}, function() {
				callback();
			});
		});
	};
};

module.exports = GenresService;