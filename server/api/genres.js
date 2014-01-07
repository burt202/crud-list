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
			newData = {},
			name = req.body.name || '';

		if (name.length === 0) {
			res.set('Content-Type', 'application/json');
			res.send(400, {
				errors: [
					{
						field: 'name',
						message: 'You must complete this field'
					}
				]
			});
		} else {
			newData.name = name;

			genresService.add(newData, function (data) {
				res.set('Content-Type', 'application/json');
				res.send(201, data);
			});
		}
	},

	putAction: function (req, res, db, id) {
		var genresService = new GenresService(db),
			newData = {},
			name = req.body.name || '';

		if (name.length === 0) {
			res.set('Content-Type', 'application/json');
			res.send(400, {
				errors: [
					{
						field: 'name',
						message: 'You must complete this field'
					}
				]
			});
		} else {
			newData.name = name;

			genresService.update(id, newData, function (data) {
				res.set('Content-Type', 'application/json');
				res.send(200, data);
			});
		}
	},

	deleteAction: function (req, res, db, id) {
		var genresService = new GenresService(db);
		genresService.delete(id, function () {
			res.set('Content-Type', 'application/json');
			res.send(200, {});
		});
	}
};