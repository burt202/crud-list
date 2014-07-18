/*var requirejs = require('requirejs');
require('../../../../init');

var Backbone = requirejs('backbone'),
	Form = requirejs('app/views/genres/form'),
	Vent = requirejs('app/views/genres/vent');

describe('Genre Form', function() {
	var form;
	beforeEach(function() {
		form = new Form({
			model: new Backbone.Model({
				action: 'action',
				title: 'title',
				name: 'name'
			})
		});
	});

	describe('Basic Instantiation', function() {
		it('should be able to be instantiated', function() {
			expect(form).toBeTruthy();
		});
	});

	describe('Add Button', function() {
		it('should trigger an event', function() {
			form.render();
			form.ui.nameInput.val('foobar');
			spyOn(Vent, 'trigger');
			form.addButton();

			expect(Vent.trigger).toHaveBeenCalledWith('add:genre', form.model, {name: 'foobar'}, form.$el);
		});
	});

	describe('Update Button', function() {
		it('should trigger an event', function() {
			form.render();
			form.ui.nameInput.val('foobar');
			spyOn(Vent, 'trigger');
			form.updateButton();

			expect(Vent.trigger).toHaveBeenCalledWith('update:genre', form.model, {name: 'foobar'}, form.$el);
		});
	});

	describe('Cancel Button', function() {
		it('should trigger an event', function() {
			spyOn(Vent, 'trigger');
			form.cancelButton();

			expect(Vent.trigger).toHaveBeenCalledWith('hide:genre-form');
		});
	});
});*/