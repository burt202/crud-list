define([
	'jquery',
	'underscore',
	'marionette',
	'app/shared/vent',
	'text!templates/genres/form.html'
], function ($, _, Marionette, Vent, tpl) {

	return Marionette.ItemView.extend({
	    id: 'genre-form-container',
	    template: _.template(tpl),

	    events: {
	        'click #add-genre-btn': 'addGenre',
	        'click #update-genre-btn': 'updateGenre',
	        'click #cancel-btn': 'hideFormEvent'
	    },

		ui: {
			nameInput: '#name'
		},

	    initialize: function () {
	        this.render();
	    },

	    render: function () {
	        this.$el.html(this.template(this.model.toJSON()));
	        $('#content').prepend(this.el);
	        this.$el.slideDown();
	    },

		addGenre: function (e) {
			e.preventDefault();

			var properties = {
				name: $(this.ui.nameInput).val()
			};

			Vent.trigger('add:genre', this.model, properties, this.$el);
		},

		updateGenre: function (e) {
			e.preventDefault();

			var properties = {
				name: $(this.ui.nameInput).val()
			};

			Vent.trigger('update:genre', this.model, properties, this.$el);
		},

	    hideFormEvent: function (e) {
	        e.preventDefault();
	        this.hideForm();
	    },

	    hideForm: function () {
	        var that = this;

	        this.$el.slideUp(400, function () {
	            that.$el.hide();
	            that.remove();
	        });
	    }
	});
});