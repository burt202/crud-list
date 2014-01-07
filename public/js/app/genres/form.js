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
			'click @ui.addButton': 'addButtonEvent',
			'click @ui.updateButton': 'updateButtonEvent',
			'click @ui.cancelButton': 'cancelButtonEvent'
		},

		addButtonEvent: function (e) {
			e.preventDefault();

			var properties = {
				name: this.ui.nameInput.val()
			};

			Vent.trigger('add:genre', this.model, properties, this.$el);
		},

		updateButtonEvent: function (e) {
			e.preventDefault();

			var properties = {
				name: this.ui.nameInput.val()
			};

			Vent.trigger('update:genre', this.model, properties, this.$el);
		},

		cancelButtonEvent: function (e) {
			e.preventDefault();
			Vent.trigger('hide:genre-form');
		}
	});
});