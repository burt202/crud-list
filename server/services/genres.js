var GenresService = function (db) {
	this.db = db;

	this.getGenres = function (callback) {
		this.db.collection('genres', function(err, collection) {
			collection.find().toArray(function(err, data) {
				callback(data);
			});
		});
	};
};

module.exports = GenresService;