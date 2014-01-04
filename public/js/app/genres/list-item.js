define([
	'underscore',
	'marionette',
	'app/shared/vent',
	'text!templates/genres/list-item.html'
], function (_, Marionette, Vent, tpl) {

	return Marionette.ItemView.extend({
	    tagName: 'li',
	    template: _.template(tpl),

	    events: {
	        'click .show-edit-genre-form': 'showEditGenreForm',
	        'click .delete-genre-btn': 'deleteGenre'
	    },

        modelEvents: {
            'change': 'render'
        },

	    showEditGenreForm: function (e) {
	        e.preventDefault();
			Vent.trigger('edit:genre', this.model);
	    },

	    deleteGenre: function (e) {
	        e.preventDefault();
	        Vent.trigger('delete:genre', this.model);
	    }
	});
});