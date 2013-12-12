define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/home/content.html',
	], function ($, _, Backbone, tpl) {

	return Backbone.View.extend({
	    template: _.template(tpl),

	    initialize: function () {
	        _.bindAll(this, 'render');
	    },

	    render: function () {
	        $(this.el).html(this.template({}));
	        return this;
	    }
	});
});