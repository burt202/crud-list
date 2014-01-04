define([
    'jquery',
    'backbone',
    'app/home/main',
    'app/genres/main'
], function ($, Backbone, HomeMain, GenresMain) {

    return Backbone.Router.extend({
        routes: {
            '': 'home',
            'genres': 'genres',
        },

        initialize: function (options) {
            this.navigation = options.navigation;
        },

        home: function () {
            this.navigation.setActive('home');

            new HomeMain(function (view) {
                $('#content').html(view.render().el);
            });
        },

        genres: function () {
            this.navigation.setActive('genres');

            new GenresMain(function (view) {
                $('#content').html(view.render().el);
            });
        }
    });
});