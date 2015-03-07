'use strict';

define([
    'underscore',
    'marionette',
    'text!templates/genres/content.html',
    'app/views/genres/vent',
    'app/views/genres/list-item'
], function (_, Marionette, tpl, Vent, GenresListItemView) {

    return Marionette.CompositeView.extend({
        template: _.template(tpl),
        attributes: {
            class: 'genres-content'
        },

        childViewContainer: '#genres-list',
        childView: GenresListItemView,

        ui: {
            newButton: '#show-add-genre-form',
            totalSpan: '#genres-list-options span'
        },

        events: {
            'click @ui.newButton': 'newButtonEvent'
        },

        collectionEvents: {
            'add remove': 'updateTotalSpan'
        },

        emptyView: Marionette.ItemView.extend({
            tagName: 'li',
            className: 'empty-row',
            render: function () {
                this.$el.html('No items');
            }
        }),

        onRender: function () {
            this.updateTotalSpan();
        },

        updateTotalSpan: function () {
            var genreCount = this.collection.length;
            var grammar = (genreCount === 1) ? 'genre' : 'genres';
            this.ui.totalSpan.html(genreCount + ' ' + grammar);
        },

        newButtonEvent: function (e) {
            e.preventDefault();
            this.newButton();
        },

        newButton: function () {
            Vent.trigger('new:genre');
        }
    });
});
