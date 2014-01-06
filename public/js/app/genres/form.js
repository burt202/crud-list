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

		ui: {
			nameInput: '#name',
			addButton: '#add-genre-btn',
			updateButton: '#update-genre-btn',
			cancelButton: '#cancel-btn'
		},

	    events: {
	        'click @ui.addButton': 'addGenre',
	        'click @ui.updateButton': 'updateGenre',
	        'click @ui.cancelButton': 'hideFormEvent'
	    },

	    initialize: function () {
	        this.render();
	    },

	    render: function () {
	        this.$el.html(this.template(this.model.toJSON()));
	        $('#content').prepend(this.el);
	        this.$el.slideDown();

	        this.bindUIElements();
	    },

		addGenre: function (e) {
			e.preventDefault();

			var properties = {
				name: this.ui.nameInput.val()
			};

			Vent.trigger('add:genre', this.model, properties, this.$el);
		},

		updateGenre: function (e) {
			e.preventDefault();

			var properties = {
				name: this.ui.nameInput.val()
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