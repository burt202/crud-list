define([
    'backbone',
    'app/shared/vent',
    'app/genres/content',
    'app/genres/form',
    'app/shared/helpers'
], function (Backbone, Vent, GenresContView, GenresFormView, Helpers) {

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

        Vent.on('delete:genre', function (model) {
            if (!confirm('Are you sure you want to delete ' + model.get('name') + '?')) {
                return;
            }

            if (genresFormView) {
                genresFormView.hideForm();
            }

            model.destroy({
                wait: true,
                success: function (model, response) {
                    genresContView.render();
                    Helpers.showNotificationMessage('success', 'Genre Deleted');
                },
            });
        }, this);

        Vent.on('add:genre', function (model, properties, formElement) {
            model.save(properties, {
                wait: true,
                success: function (model, response) {
                    genreCollection.add(model);
                    genresFormView.hideForm();
                    genresContView.render();
                    Helpers.showNotificationMessage('success', 'Genre Added');
                },
                error: function (model, response) {
                    var responseJson = $.parseJSON(response.responseText);
                    Helpers.showValidationErrors(formElement, responseJson.errors);
                }
            });
        }, this);

        Vent.on('update:genre', function (model, properties, formElement) {
            model.save(properties, {
                wait: true,
                success: function (model, response) {
                    genresFormView.hideForm();
                    Helpers.showNotificationMessage('success', 'Genre Updated');
                },
                error: function (model, response) {
                    var responseJson = $.parseJSON(response.responseText);
                    Helpers.showValidationErrors(formElement, responseJson.errors);
                }
            });
        }, this);

        this.showForm  = function (model) {
            if (genresFormView) {
                genresFormView.remove();
            }

            genresFormView = new GenresFormView({
                model: model
            });
        };

        genresContView = new GenresContView();

        genreCollection = new GenreCollection();
        genreCollection.fetch({
            success: function () {
                genresContView.collection = genreCollection;
                callback(genresContView);
            }
        });
    }
});