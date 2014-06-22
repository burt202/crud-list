var express = require('express');
var ApiRoutes = express.Router();

module.exports = function (config, db) {

	ApiRoutes.use(function(req, res, next) {
		if (config.apiLogging) {
			console.log(req.method, req.url, new Date().toLocaleString());
		}
		next();
	});

	// GENRES

	var Genres = require(__dirname + '/api/genres');
	var genres = new Genres(db);

	ApiRoutes.route('/genres')
		.get(genres.getAction.bind(genres))
		.post(genres.postAction.bind(genres));

	ApiRoutes.route('/genres/:genre_id')
		.put(genres.putAction.bind(genres))
		.delete(genres.deleteAction.bind(genres));

	return ApiRoutes;
};
