var GenresService = require(__dirname + '/../services/genres');

module.exports = {
	getAction: function (req, res, db) {
		var genresService = new GenresService(db);
		genresService.get(function (data) {
			res.set('Content-Type', 'application/json');
			res.send(200, data);
		});
	},

	postAction: function (req, res, db) {
		var genresService = new GenresService(db),
			data = {
				name: req.body.name || ''
			},
			errors = genresService.validate(data);

		if (errors.length > 0) {
			res.set('Content-Type', 'application/json');
			res.send(400, {
				errors: errors
			});
		} else {
			genresService.add(data, function (data) {
				res.set('Content-Type', 'application/json');
				res.send(201, data);
			});
		}
	},

	putAction: function (req, res, db, id) {
		var genresService = new GenresService(db),
			data = {
				name: req.body.name || ''
			},
			errors = genresService.validate(data);

		if (errors.length > 0) {
			res.set('Content-Type', 'application/json');
			res.send(400, {
				errors: errors
			});
		} else {
			genresService.update(id, data, function (data) {
				res.set('Content-Type', 'application/json');
				res.send(200, data);
			});
		}
	},

	deleteAction: function (req, res, db, id) {
		var genresService = new GenresService(db);
		genresService.remove(id, function () {
			res.set('Content-Type', 'application/json');
			res.send(200, {});
		});
	}
};