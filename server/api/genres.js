var GenresService = require(__dirname + '/../services/genres');

module.exports = {
	getAction: function (req, res, db) {
		var genresService = new GenresService(db);
		genresService.getGenres(function (data) {
			res.set('Content-Type', 'application/json');
			res.send(200, {
				state: 'success',
				message: 'Genres Retreived',
				data: data
			});
	    });
	}
};