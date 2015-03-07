'use strict';

define([
    'app/app',
    'app/views/home/content',
    'app/views/genres/layout'
], function (App, HomeContent, GenresLayout) {

    return {
        home: function () {
            App.navigation.currentView.setActive('home');

            var view = new HomeContent();
            App.content.show(view);
        },

        genres: function () {
            App.navigation.currentView.setActive('genres');

            var view = new GenresLayout();
            App.content.show(view);
        }
    };
});
