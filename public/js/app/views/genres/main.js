define([
	'jquery',
	'backbone',
	'app/views/genres/vent',
	'app/views/genres/content',
	'app/views/genres/form',
	'app/views/shared/helpers'
], function ($, Backbone, Vent, GenresContView, GenresFormView, Helpers) {

	return function (callback) {
		var GenreModel,
			GenreCollection,
			genreCollection,
			genresFormView,
			genresContView;

		GenreModel = Backbone.Model.extend({
			idAttribute: '_id',
			urlRoot: '/api/genres/'
		});

		GenreCollection = Backbone.Collection.extend({
			model: GenreModel,
			url: '/api/genres/',
			comparator: 'name'
		});

		Vent.on('new:genre', function () {
			var model = new GenreModel({
				action: 'add',
				title: 'Add A Genre'
			});

			this.showForm(model);
		}, this);

		Vent.on('edit:genre', function (model) {
			model.set({
				action: 'edit',
				title: 'Update ' + model.get('name')
			});

			this.showForm(model);
		}, this);

		Vent.on('add:genre', function (model, properties, formElement) {
			var that = this;

			model.save(properties, {
				wait: true,
				success: function (model) {
					genreCollection.add(model);
					that.hideForm();
					Helpers.showNotificationMessage('success', 'Genre Added');
				},
				error: function (model, response) {
					var responseJson = $.parseJSON(response.responseText);
					Helpers.showValidationErrors(formElement, responseJson.errors);
				}
			});
		}, this);

		Vent.on('update:genre', function (model, properties, formElement) {
			var that = this;

			model.save(properties, {
				wait: true,
				success: function () {
					that.hideForm();
					Helpers.showNotificationMessage('success', 'Genre Updated');
				},
				error: function (model, response) {
					var responseJson = $.parseJSON(response.responseText);
					Helpers.showValidationErrors(formElement, responseJson.errors);
				}
			});
		}, this);

		Vent.on('delete:genre', function (model) {
			if (!confirm('Are you sure you want to delete ' + model.get('name') + '?')) {
				return;
			}

			if (genresFormView) {
				this.hideForm();
			}

			model.destroy({
				wait: true,
				success: function () {
					Helpers.showNotificationMessage('success', 'Genre Deleted');
				}
			});
		}, this);

		Vent.on('hide:genre-form', function () {
			this.hideForm();
		}, this);

		this.showForm  = function (model) {
			if (genresFormView) {
				genresFormView.remove();
			}

			genresFormView = new GenresFormView({
				model: model
			});

			$('#content').prepend(genresFormView.render().el);
			genresFormView.$el.slideDown(400, function () {
				genresFormView.ui.nameInput.focus();
			});
		};

		this.hideForm  = function () {
			genresFormView.$el.slideUp(400, function () {
				genresFormView.$el.hide();
				genresFormView.remove();
			});
		};

		genreCollection = new GenreCollection();
		genreCollection.fetch({
			success: function () {
				genresContView = new GenresContView({
					collection: genreCollection
				});

				callback(genresContView);
			}
		});
	};
});