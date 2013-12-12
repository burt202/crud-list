define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/shared/navigation.html'
	], function ($, _, Backbone, tpl) {

	return Backbone.View.extend({
	    template: _.template(tpl),
	    tagName: 'nav',

	    initialize: function () {
	        _.bindAll(this, 'render', 'setActive');
	    },

	    render: function () {
	        $(this.el).html(this.template({}));
	        return this;
	    },

	    setActive: function (link) {
	    	$(this.el).find('li').removeClass('active');
	    	$(this.el).find('li.' + link).addClass('active');
	    }
	});
});