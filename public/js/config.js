'use strict';

/* global requirejs */
requirejs.config({
    baseUrl: 'bower_components',
    paths: {
        app: '../js/app',
        templates: '../templates',
        backbone: 'backbone/backbone',
        marionette: 'marionette/lib/backbone.marionette',
        jquery: 'jquery/dist/jquery',
        text: 'requirejs-text/text',
        underscore: 'underscore/underscore',
        q: 'q/q'
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
