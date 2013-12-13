define([
    'backbone',
    'app/shared/eventAggregator',
    'app/genres/content',
    'app/genres/form',
    'app/shared/helpers'
    ], function (Backbone, vent, GenresContView, GenresFormView, Helpers) {

    return function (callback) {
    	var GenreModel,
            GenreCollection,
            genreCollection,
            genresFormView;

        GenreModel = Backbone.Model.extend({
            idAttribute: '_id',
            urlRoot: '/api/genres/'
        });

        GenreCollection = Backbone.Collection.extend({
            model: GenreModel,
            url: '/api/genres/',
            comparator: 'name',
            parse: function (response) {
                return response.data;
            }
        });

        vent.on('new:genre', function () {
            var model = new GenreModel({
                action: 'add',
                title: 'Add A Genre'
            });

            this.showForm(model);
        }, this);

        vent.on('edit:genre', function (model) {
            model.set({
                action: 'edit',
                title: 'Update ' + model.get('name')
            });

            this.showForm(model);
        }, this);

        vent.on('delete:genre', function (model) {
            if (!confirm('Are you sure you want to delete ' + model.get('name') + '?')) {
                return;
            }

            if (genresFormView) {
                genresFormView.hideForm();
            }

            model.destroy({
                wait: true,
                success: function (model, response) {
                    Helpers.showNotificationMessage('success', 'Genre Deleted');
                },
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

        genreCollection = new GenreCollection();
        genreCollection.fetch({
            success: function () {
                var genresContView = new GenresContView({
                    collection: genreCollection
                });

                callback(genresContView);
            }
        });
    }
});