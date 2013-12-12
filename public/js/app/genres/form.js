define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/genres/form.html'
	], function ($, _, Backbone, tpl) {

	return Backbone.View.extend({
	    id: 'genre-form-container',
	    template: _.template(tpl),

	    events: {
	        'click #cancel-btn': 'hideFormEvent'
	    },

	    initialize: function () {
	        _.bindAll(this, 'render', 'hideFormEvent', 'hideForm');
	        this.render();
	    },

	    render: function () {
	        $(this.el).html(this.template(this.model.toJSON()));
	        $('#content').prepend(this.el);
	        $(this.el).slideDown();
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