define([
	'jquery',
	'underscore',
	'backbone',
	'app/shared/eventAggregator',
	'text!templates/genres/content.html',
	'./list-item'
	], function ($, _, Backbone, vent, tpl, GenresListItemView) {

	return Backbone.View.extend({
	    template: _.template(tpl),

	    events: {
	        'click #show-add-genre-form': 'showAddGenreForm'
	    },

	    initialize: function () {
	        _.bindAll(this, 'render', 'showAddGenreForm');
	        this.collection.on('add remove', this.render);
	    },

	    render: function () {
	        var list,
	            data = {
	                genreCount: this.collection.length
	            };

	        $(this.el).html(this.template(data));
	        list = $(this.el).find('ul#genres-list');

	        _.each(this.collection.models, function (model) {
	            list.append(new GenresListItemView({model: model}).render().el);
	        });

	        return this;
	    },

	    showAddGenreForm: function (e) {
	        e.preventDefault();
	        vent.trigger('new:genre');
	    }
	});
});