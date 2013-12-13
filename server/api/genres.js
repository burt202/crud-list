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
	},

	deleteAction: function (req, res, db, id) {
		var genresService = new GenresService(db);
		genresService.deleteGenre(id, function () {
			res.set('Content-Type', 'application/json');
			res.send(200, {
				state: 'success',
				message: 'Genre Deleted',
				data: {}
			});
		});
	}
};