var GenresService = require(__dirname + '/../services/genres');

var GenresController = function (db) {
	this.genresService = new GenresService(db);

	this.getAction = function (req, res) {
		this.genresService.getAll(function (data) {
			res.set('Content-Type', 'application/json');
			res.send(200, data);
		});
	};

	this.postAction = function (req, res) {
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
			this.genresService.add(data, function (data) {
				res.set('Content-Type', 'application/json');
				res.send(201, data);
			});
		}
	};
};

module.exports = GenresController;
