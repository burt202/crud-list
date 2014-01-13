define([
	'underscore',
	'marionette',
	'text!templates/shared/navigation.html'
], function (_, Marionette, tpl) {

	return Marionette.ItemView.extend({
		template: _.template(tpl),
		tagName: 'nav',

		ui: {
			listItem: 'li'
		},

		setActive: function (link) {
			this.ui.listItem.removeClass('active');
			this.ui.listItem.siblings('.' + link).addClass('active');
		}
	});
});