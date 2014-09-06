define([
    'app/app',
    'app/views/home/main',
    'app/views/genres/main'
], function (App, HomeMain, GenresMain) {

    return {
        home: function () {
            App.navigation.currentView.setActive('home');

            var homeMain = new HomeMain();
            homeMain.start()
                .then(function (view) {
                    App.content.show(view);
                })
                .done();
        },

        genres: function () {
            App.navigation.currentView.setActive('genres');

            var genresMain = new GenresMain();
            genresMain.start()
                .then(function (view) {
                    App.content.show(view);
                })
                .done();
        }
    };
});
