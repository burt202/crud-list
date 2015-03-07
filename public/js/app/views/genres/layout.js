'use strict';

define([
    'underscore',
    'jquery',
    'backbone',
    'marionette',
    'q',
    'app/views/genres/vent',
    'app/views/genres/content',
    'app/views/genres/form',
    'app/views/shared/helpers',
    'app/models/genres',
    'app/collections/genres',
    'text!templates/genres/layout.html',
], function (_, $, Backbone, Marionette, q, Vent, GenresContView, GenresFormView, Helpers, GenreModel, GenreCollection, tpl) {

    var GenresLayout = Marionette.LayoutView.extend({
        template: _.template(tpl),
        attributes: {
            class: 'genres-layout'
        },

        regions: {
            mainRegion: '.content-region',
        },

        initialize: function () {
            this.genresFormView = null;
            this.genreCollection = new GenreCollection();

            this.setupListeners();
        },

        onRender: function () {
            var promises = [],
                genresContView;

            promises.push(this.genreCollection.fetch());

            q.all(promises).then(function () {
                genresContView = new GenresContView({
                    collection: this.genreCollection
                });

                this.mainRegion.show(genresContView);
            }.bind(this));
        },

        setupListeners: function () {
            this.listenTo(Vent, 'new:genre', this.newGenre);
            this.listenTo(Vent, 'edit:genre', this.editGenre);
            this.listenTo(Vent, 'add:genre', this.addGenre);
            this.listenTo(Vent, 'update:genre', this.updateGenre);
            this.listenTo(Vent, 'delete:genre', this.deleteGenre);
            this.listenTo(Vent, 'hide:genre-form', this.hideForm);
        },

        newGenre: function () {
            var model = new GenreModel({
                name: ''
            });

            this.showForm(model, {
                title: 'Add A Genre',
                action: 'add'
            });
        },

        editGenre: function (model) {
            this.showForm(model, {
                title: 'Update ' + model.get('name'),
                action: 'edit'
            });
        },

        addGenre: function (model, properties, formElement) {
            model.save(properties, {
                success: function (model) {
                    this.genreCollection.add(model);
                    this.hideForm();
                    Helpers.showNotificationMessage('success', 'Genre Added');
                }.bind(this),
                error: function (model, response) {
                    var responseJson = JSON.parse(response.responseText);
                    Helpers.showValidationErrors(formElement, responseJson.errors);
                }
            });
        },

        updateGenre: function (model, properties, formElement) {
            model.save(properties, {
                success: function () {
                    this.hideForm();
                    Helpers.showNotificationMessage('success', 'Genre Updated');
                }.bind(this),
                error: function (model, response) {
                    var responseJson = JSON.parse(response.responseText);
                    Helpers.showValidationErrors(formElement, responseJson.errors);
                }
            });
        },

        deleteGenre: function (model) {
            if (this.genresFormView) this.hideForm();

            model.destroy({
                success: function () {
                    Helpers.showNotificationMessage('success', 'Genre Deleted');
                }
            });
        },

        showForm: function (model, viewOptions) {
            if (this.genresFormView) this.genresFormView.remove();

            this.genresFormView = new GenresFormView(_.extend({
                model: model
            }, viewOptions));

            $('#content').prepend(this.genresFormView.render().el);
            this.genresFormView.$el.slideDown(400, function () {
                this.genresFormView.ui.nameInput.focus();
            }.bind(this));
        },

        hideForm: function () {
            this.genresFormView.$el.slideUp(400, function () {
                this.genresFormView.$el.hide();
                this.genresFormView.remove();
            }.bind(this));
        }
    });

    return GenresLayout;
});
