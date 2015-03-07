'use strict';

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

	describe('Notification Messages', function () {
		it('should show a notification', function () {
			Helpers.showNotificationMessage('success', 'test message');

			expect($('.notification').length).to.equal(1);
			expect($('.notification').html()).to.equal('test message');
			expect($('.notification').hasClass('notification')).to.be.true;
			expect($('.notification').hasClass('notification-success')).to.be.true;
		});

		it('should only allow one notification on screen at once', function () {
			Helpers.showNotificationMessage('success', 'test message');
			Helpers.showNotificationMessage('success', 'another message');

			expect($('.notification').length).to.equal(1);
		});
	});
});