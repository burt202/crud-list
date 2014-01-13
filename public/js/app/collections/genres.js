define([
	'backbone',
	'app/models/genres'
], function (Backbone, GenreModel) {

	return Backbone.Collection.extend({
		model: GenreModel,
		url: '/api/genres/',
		comparator: 'name'
	});
});