'use strict';

define([
    'underscore',
    'marionette',
    'text!templates/home/content.html'
], function (_, Marionette, tpl) {

    return Marionette.ItemView.extend({
        template: _.template(tpl),
        attributes: {
            class: 'home-content'
        }
    });
});
