define([
	'marionette',
	'app/controller'
], function (Marionette, Controller) {

	var Router = Marionette.AppRouter.extend({
		appRoutes: {
			'': 'home',
			'genres': 'genres'
		}
	});

	return new Router({
		controller: Controller
	});
});