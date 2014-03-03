define([
	'jquery',
	'backbone',
	'app/views/genres/vent',
	'app/views/genres/content',
	'app/views/genres/form',
	'app/views/shared/helpers',
	'app/models/genres',
	'app/collections/genres'
], function ($, Backbone, Vent, GenresContView, GenresFormView, Helpers, GenreModel, GenreCollection) {

	return function (callback) {
		var genresFormView,
			genresContView,
			genreCollection = new GenreCollection();

		Vent.on('new:genre', function () {
			this.newGenre();
		}, this);

		Vent.on('edit:genre', function (model) {
			this.editGenre(model);
		}, this);

		Vent.on('add:genre', function (model, properties, formElement) {
			this.addGenre(model, properties, formElement);
		}, this);

		Vent.on('update:genre', function (model, properties, formElement) {
			this.updateGenre(model, properties, formElement);
		}, this);

		Vent.on('delete:genre', function (model) {
			this.deleteGenre(model);
		}, this);

		Vent.on('hide:genre-form', function () {
			this.hideForm();
		}, this);

		this.newGenre = function () {
			var model = new GenreModel({
				action: 'add',
				title: 'Add A Genre',
				name: ''
			});

			this.showForm(model);
		};

		this.editGenre = function (model) {
			model.set({
				action: 'edit',
				title: 'Update ' + model.get('name')
			});

			this.showForm(model);
		};

		this.addGenre = function (model, properties, formElement) {
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
		};

		this.updateGenre = function (model, properties, formElement) {
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
		};

		this.deleteGenre = function (model) {
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
		};

		this.showForm = function (model) {
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

		this.hideForm = function () {
			genresFormView.$el.slideUp(400, function () {
				genresFormView.$el.hide();
				genresFormView.remove();
			});
		};

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