define([
    'marionette',
    'backbone',
    'app/views/shared/navigation'
], function (Marionette, Backbone, NavigationView) {

    var app = new Marionette.Application(),
        navigation = new NavigationView();

    app.addRegions({
        navigation: '#navigation',
        content: '#content'
    });

    app.addInitializer(function () {
        app.navigation.show(navigation);
        Backbone.history.start();
    });

    return app;
});
