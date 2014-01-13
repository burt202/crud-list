define([
	'app/app',
	'app/views/home/main',
	'app/views/genres/main'
], function (App, HomeMain, GenresMain) {

	return {
		home: function () {
			App.navigation.currentView.setActive('home');

			var homeMain;
			homeMain = new HomeMain(function (view) {
				App.content.show(view);
			});
		},

		genres: function () {
			App.navigation.currentView.setActive('genres');

			var genresMain;
			genresMain = new GenresMain(function (view) {
				App.content.show(view);
			});
		}
	};
});