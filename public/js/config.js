define([], function () {
	return {
		baseUrl: 'bower_components',
		paths: {
			app: '../js/app',
			templates: '../templates',
			tests: '../tests/',
			backbone: 'backbone/backbone',
			marionette: 'marionette/lib/backbone.marionette',
			jquery: 'jquery/dist/jquery',
			text: 'requirejs-text/text',
			underscore: 'underscore/underscore'
		},
		shim: {
			underscore: {
				exports: '_'
			},
			backbone: {
				deps: ['underscore', 'jquery'],
				exports: 'Backbone'
			},
			marionette: {
				deps: ['backbone'],
				exports: 'Backbone.Marionette'
			}
		}
	};
});