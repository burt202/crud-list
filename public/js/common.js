requirejs.config({
    baseUrl: 'js/libs',
    paths: {
        app: '../app',
        templates: '../../templates'
    },
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
	}
});

require(['backbone', 'app/router'], function (Backbone, Router) {
    var router = new Router();
    Backbone.history.start();
});