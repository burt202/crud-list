var express = require('express');
var ApiRoutes = express.Router();
var controllerDir = __dirname + '/controllers/';

module.exports = function (config, db) {

	ApiRoutes.use(function(req, res, next) {
		if (config.apiLogging) {
			console.log(req.method, req.url, new Date().toLocaleString());
		}
		next();
	});

	// genres

	var Genres = require(controllerDir + 'genres');
	var genres = new Genres(db);

	ApiRoutes.route('/genres')
		.get(genres.getAction.bind(genres))
		.post(genres.postAction.bind(genres));

	// genre

	var Genre = require(controllerDir + 'genre');
	var genre = new Genre(db);

	ApiRoutes.route('/genres/:genre_id')
		.get(genre.getAction.bind(genre))
		.put(genre.putAction.bind(genre))
		.delete(genre.deleteAction.bind(genre));

	return ApiRoutes;
};
