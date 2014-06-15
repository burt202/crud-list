var jsdom = require('jsdom'),
	requirejs = require('requirejs');

global.document = jsdom.jsdom('<html><body></body></html>');
global.window = global.document.parentWindow;

requirejs.config({
	baseUrl: __dirname + '/../public/bower_components',
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
});

var jQuery = requirejs('jquery');

global.$ = jQuery;