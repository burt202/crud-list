define([
    'app/home/content'
], function (HomeContView) {

    return function (callback) {
        var homeContView = new HomeContView();
        callback(homeContView);
    };
});