var requirejs = require('../../../specrunner-requirejs');
require('../../../specrunner-jquery');

var expect = require('chai').expect; /* jshint expr:true */
var Navigation = requirejs('app/views/shared/navigation');

describe('Navigation', function() {
	describe('Basic Instantiation', function() {
		it('should be able to be instantiated', function() {
			var navigation = new Navigation();

			expect(navigation).to.be.defined;
		});
	});

	describe('Set Active', function() {
		it('should set a menu link with an active class', function() {
			var navigation = new Navigation();
			navigation.render();
			navigation.setActive('home');

			expect(navigation.ui.listItem.filter('.home').hasClass('active')).to.be.true;
		});

		it('should remove active classes from other menu links', function() {
			var navigation = new Navigation();
			navigation.render();
			navigation.setActive('home');
			navigation.setActive('genres');

			expect(navigation.ui.listItem.filter('.home').hasClass('active')).to.be.false;
		});
	});
});