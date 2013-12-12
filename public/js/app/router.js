define([
    'jquery',
    'backbone',
    'app/shared/navigation',
    'app/home/main',
    'app/genres/main'
    ], function ($, Backbone, NavigationView, HomeMain, GenresMain) {

    return Backbone.Router.extend({
        routes: {
            '': 'home',
            'genres': 'genres',
        },

		initialize: function () {
            this.navigationView = new NavigationView();
            $('#navigation').html(this.navigationView.render().el);
		},

        home: function () {
        	this.navigationView.setActive('home');

            var homeMain = new HomeMain(function (view) {
                $('#content').html(view.render().el);
            });
        },

        genres: function () {
            this.navigationView.setActive('genres');

            var genresMain = new GenresMain(function (view) {
                $('#content').html(view.render().el);
            });
        }
    });
});