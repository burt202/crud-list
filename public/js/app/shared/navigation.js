define([
	'underscore',
	'marionette',
	'text!templates/shared/navigation.html'
], function (_, Marionette, tpl) {

	return Marionette.ItemView.extend({
	    template: _.template(tpl),
	    tagName: 'nav',

		setActive: function (link) {
			this.$el.find('li').removeClass('active');
			this.$el.find('li.' + link).addClass('active');
		}
	});
});