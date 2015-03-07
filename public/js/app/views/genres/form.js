'use strict';

define([
    'underscore',
    'marionette',
    'app/views/genres/vent',
    'text!templates/genres/form.html'
], function (_, Marionette, Vent, tpl) {

    return Marionette.ItemView.extend({
        id: 'genre-form-container',
        template: _.template(tpl),

        ui: {
            nameInput: '#name',
            addButton: '#add-genre-btn',
            updateButton: '#update-genre-btn',
            cancelButton: '#cancel-btn'
        },

        events: {
            'click @ui.addButton': 'addButtonEvent',
            'click @ui.updateButton': 'updateButtonEvent',
            'click @ui.cancelButton': 'cancelButtonEvent'
        },

        initialize: function (options) {
            this.title = options.title;
            this.action = options.action;
        },

        serializeData: function () {
            return {
                title: this.title,
                action: this.action,
                name: this.model.get('name')
            };
        },

        addButtonEvent: function (e) {
            e.preventDefault();
            this.addButton();
        },

        addButton: function () {
            var properties = {
                name: this.ui.nameInput.val()
            };

            Vent.trigger('add:genre', this.model, properties, this.$el);
        },

        updateButtonEvent: function (e) {
            e.preventDefault();
            this.updateButton();
        },

        updateButton: function () {
            var properties = {
                name: this.ui.nameInput.val()
            };

            Vent.trigger('update:genre', this.model, properties, this.$el);
        },

        cancelButtonEvent: function (e) {
            e.preventDefault();
            this.cancelButton();
        },

        cancelButton: function () {
            Vent.trigger('hide:genre-form');
        }
    });
});
