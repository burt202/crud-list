var requirejs = require('requirejs');
require('../../../../init');

var Navigation = requirejs('app/views/shared/navigation');

describe('Navigation', function() {
	describe('Basic Instantiation', function() {
		it('should be able to be instantiated', function() {
			var navigation = new Navigation();

			expect(navigation).toBeTruthy();
		});
	});

	describe('Set Active', function() {
		it('should set a menu link with an active class', function() {
			var navigation = new Navigation();
			navigation.render();
			navigation.setActive('home');

			expect(navigation.ui.listItem.filter('.home').hasClass('active')).toBe(true);
		});

		it('should remove active classes from other menu links', function() {
			var navigation = new Navigation();
			navigation.render();
			navigation.setActive('home');
			navigation.setActive('genres');

			expect(navigation.ui.listItem.filter('.home').hasClass('active')).toBe(false);
		});
	});
});