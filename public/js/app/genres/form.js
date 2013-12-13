define([
	'jquery',
	'underscore',
	'backbone',
	'app/shared/eventAggregator',
	'text!templates/genres/form.html'
	], function ($, _, Backbone, vent, tpl) {

	return Backbone.View.extend({
	    id: 'genre-form-container',
	    template: _.template(tpl),

	    events: {
	        'click #add-genre-btn': 'addGenre',
	        'click #update-genre-btn': 'updateGenre',
	        'click #cancel-btn': 'hideFormEvent'
	    },

	    initialize: function () {
	        _.bindAll(this, 'render', 'addGenre', 'updateGenre', 'hideFormEvent', 'hideForm');
	        this.render();
	    },

	    render: function () {
	        $(this.el).html(this.template(this.model.toJSON()));
	        $('#content').prepend(this.el);
	        $(this.el).slideDown();
	    },

		addGenre: function (e) {
			e.preventDefault();

			var properties = {
				name: $('#name').val()
			};

			vent.trigger('add:genre', this.model, properties, $(this.el));
		},

		updateGenre: function (e) {
			e.preventDefault();

			var properties = {
				name: $('#name').val()
			};

			vent.trigger('update:genre', this.model, properties, $(this.el));
		},

	    hideFormEvent: function (e) {
	        e.preventDefault();
	        this.hideForm();
	    },

	    hideForm: function () {
	        var that = this;

	        $(that.el).slideUp(400, function () {
	            $(that.el).hide();
	            that.remove();
	        });
	    }
	});
});