define([
	'underscore',
	'marionette',
	'text!templates/genres/content.html',
	'app/views/genres/vent',
	'app/views/genres/list-item'
], function (_, Marionette, tpl, Vent, GenresListItemView) {

	return Marionette.CompositeView.extend({
		template: _.template(tpl),
		childViewContainer: '#genres-list',
		childView: GenresListItemView,

		ui: {
			newButton: '#show-add-genre-form'
		},

		events: {
			'click @ui.newButton': 'newButtonEvent'
		},

		collectionEvents: {
			'add remove': 'render'
		},

		// override _initialEvents function to stop the binding of default marionette collectionView events,
		// collectionEvents declared above is all we need here
		_initialEvents: function () {},

		emptyView: Marionette.ItemView.extend({
			tagName: 'li',
			className: 'empty-row',
			render: function () {
				this.$el.html('No items');
			}
		}),

		serializeData: function () {
			return {
				genreCount: this.collection.length
			};
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