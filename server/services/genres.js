var mongodb = require('mongodb');

var GenresService = function (db) {
	this.db = db;

	this.validate = function (id, required, data) {
		var errors = [];

		if (id && !this.isValidObjectID(id)) {
			errors.push({
				field: 'id',
				message: 'You must provide a valid id'
			});
		}

		required.forEach(function (fieldName) {
			if (!data[fieldName]) {
				errors.push({
					field: 'name',
					message: 'You must complete this field'
				});
			}
		});

		return errors;
	};

	this.isValidObjectID = function (str) {
		var len = str.length,
			valid = false;

		if (len === 12 || len === 24) {
			valid = /^[0-9a-fA-F]+$/.test(str);
		}

		return valid;
	};

	this.getAll = function (callback) {
		this.db.genres.find()
			.sort({ name: 1 })
			.toArray(function(err, data) {
				callback(data);
			});
	};

	this.get = function (id, callback) {
		this.db.genres.find({_id: new mongodb.ObjectID(id)}).toArray(function(err, data) {
			callback(data[0]);
		});
	};

	this.add = function (data, callback) {
		this.db.genres.insert(data, {safe: true}, function (err, result) {
			callback(result[0]);
		});
	};

	this.update = function (id, data, callback) {
		this.db.genres.update({_id: new mongodb.ObjectID(id)}, data, function () {
			callback(data);
		});
	};

	this.remove = function (id, callback) {
		this.db.genres.remove({_id: new mongodb.ObjectID(id)}, function() {
			callback();
		});
	};
};

module.exports = GenresService;