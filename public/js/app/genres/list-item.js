define([
	'jquery',
	'underscore',
	'backbone',
	'app/shared/eventAggregator',
	'text!templates/genres/list-item.html'
	], function ($, _, Backbone, vent, tpl) {

	return Backbone.View.extend({
	    tagName: 'li',
	    template: _.template(tpl),

	    events: {
	        'click .show-edit-genre-form': 'showEditGenreForm',
	        'click .delete-genre-btn': 'deleteGenre'
	    },

	    initialize: function () {
	        _.bindAll(this, 'render', 'showEditGenreForm', 'deleteGenre');
	        this.model.on('change', this.render);
	    },

	    render: function () {
	        $(this.el).html(this.template(this.model.toJSON()));
	        return this;
	    },

	    showEditGenreForm: function (e) {
	        e.preventDefault();
			vent.trigger('edit:genre', this.model);
	    },

	    deleteGenre: function (e) {
	        e.preventDefault();
	        vent.trigger('delete:genre', this.model);
	    }
	});
});