/* jshint -W079, unused:false */
var requireJsConfig = {
	baseUrl: 'bower_components',
	paths: {
		app: '../js/app',
		templates: '../templates',
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

// for nodeJS require when used in the test runners
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	module.exports = requireJsConfig;
}
