define([
	'underscore',
	'marionette',
	'text!templates/genres/content.html',
	'app/shared/vent',
	'app/genres/list-item'
], function (_, Marionette, tpl, Vent, GenresListItemView) {

	return Marionette.CompositeView.extend({
        template: _.template(tpl),
        itemViewContainer: '#genres-list',
        itemView: GenresListItemView,

	    events: {
	        'click #show-add-genre-form': 'showAddGenreForm'
	    },

        emptyView: Marionette.ItemView.extend({
            render: function () {
                this.$el.html('<li>No items</li>');
            }
        }),

        serializeData: function () {
            return {
                genreCount: this.collection.length
            };
        },

	    showAddGenreForm: function (e) {
	        e.preventDefault();
	        Vent.trigger('new:genre');
	    }
    });
});