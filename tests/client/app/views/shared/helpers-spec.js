var requirejs = require('../../../specrunner-requirejs');
require('../../../specrunner-jquery');

var expect = require('chai').expect; /* jshint expr:true */
var Helpers = requirejs('app/views/shared/helpers');
var $ = requirejs('jquery');

describe('Helpers', function () {
	describe('Validation Errors', function () {
		it('should show error for a field element', function () {
			var element = $('<div/>').html('<input id="test" />'),
				errors = [
					{field: 'test', message: 'message'}
				];

			Helpers.showValidationErrors(element, errors);

			expect(element.find('#test').next().prop('outerHTML')).to.equal('<p class="error">message</p>');
		});

		it('should not add another error if one already exists for the field element', function() {
			var element = $('<div/>').html('<input id="test" /><p class="error">message</p>'),
				errors = [
					{field: 'test', message: 'message'}
				];

			Helpers.showValidationErrors(element, errors);

			expect(element.find('.error').length).to.equal(1);
		});

		it('should remove error on field element focus', function () {
			var element = $('<div/>').html('<input id="test" />'),
				errors = [
					{field: 'test', message: 'message'}
				];

			Helpers.showValidationErrors(element, errors);
			element.find('#test').triggerHandler('focus');

			expect(element.find('.error').length).to.equal(0);
		});
	});
});