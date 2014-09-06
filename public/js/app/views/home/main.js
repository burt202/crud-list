define([
    'q',
    'app/views/home/content'
], function (q, HomeContView) {

    return function () {
        this.start = function () {
            return q(new HomeContView());
        };
    };
});
