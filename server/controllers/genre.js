var GenresService = require(__dirname + '/../services/genres');

var GenreController = function (db) {
	this.genresService = new GenresService(db);

	this.getAction = function (req, res) {
		this.genresService.get(req.param('genre_id'), function (data) {
			res.set('Content-Type', 'application/json');
			res.send(200, data);
		});
	};

	this.putAction = function (req, res) {
		var data = {
				name: req.body.name || ''
			},
			errors = this.genresService.validate(data);

		if (errors.length > 0) {
			res.set('Content-Type', 'application/json');
			res.send(400, {
				errors: errors
			});
		} else {
			this.genresService.update(req.param('genre_id'), data, function (data) {
				res.set('Content-Type', 'application/json');
				res.send(200, data);
			});
		}
	};

	this.deleteAction = function (req, res) {
		this.genresService.remove(req.param('genre_id'), function () {
			res.set('Content-Type', 'application/json');
			res.send(200, {});
		});
	};
};

module.exports = GenreController;