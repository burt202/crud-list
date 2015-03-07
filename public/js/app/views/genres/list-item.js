'use strict';

define([
    'underscore',
    'marionette',
    'app/views/genres/vent',
    'text!templates/genres/list-item.html'
], function (_, Marionette, Vent, tpl) {

    return Marionette.ItemView.extend({
        tagName: 'li',
        template: _.template(tpl),

        ui: {
            editIcon: '.show-edit-genre-form',
            deleteIcon: '.delete-genre-btn'
        },

        events: {
            'click @ui.editIcon': 'editIconEvent',
            'click @ui.deleteIcon': 'deleteIconEvent'
        },

        modelEvents: {
            'change': 'render'
        },

        editIconEvent: function () {
            Vent.trigger('edit:genre', this.model);
        },

        deleteIconEvent: function () {
            Vent.trigger('delete:genre', this.model);
        }
    });
});
