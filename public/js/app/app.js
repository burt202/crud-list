define([
	'marionette',
	'backbone',
	'app/router',
	'app/shared/navigation'
], function (Marionette, Backbone, Router, NavigationView) {

	var app = new Marionette.Application(),
		navigation = new NavigationView(),
		router;

	app.addRegions({
		navigation: '#navigation',
		content: '#content'
	});

	app.addInitializer(function () {
		app.navigation.show(navigation);

		router = new Router({
			navigation: navigation
		});

		Backbone.history.start();
	});

	return app;
});