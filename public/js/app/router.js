define([
	'jquery',
	'backbone',
	'app/home/main',
	'app/genres/main'
], function ($, Backbone, HomeMain, GenresMain) {

	return Backbone.Router.extend({
		routes: {
			'': 'home',
			'genres': 'genres'
		},

		initialize: function (options) {
			this.navigation = options.navigation;
		},

		home: function () {
			var homeMain;
			this.navigation.setActive('home');

			homeMain = new HomeMain(function (view) {
				$('#content').html(view.render().el);
			});
		},

		genres: function () {
			var genresMain;
			this.navigation.setActive('genres');

			genresMain = new GenresMain(function (view) {
				$('#content').html(view.render().el);
			});
		}
	});
});