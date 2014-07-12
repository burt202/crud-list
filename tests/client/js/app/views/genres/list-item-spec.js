var requirejs = require('requirejs');
require('../../../../init');

var ListItem = requirejs('app/views/genres/list-item'),
	Vent = requirejs('app/views/genres/vent');

describe('Genre List Item', function() {
	describe('Basic Instantiation', function() {
		it('should be able to be instantiated', function() {
			var listItem = new ListItem();

			expect(listItem).toBeTruthy();
		});
	});

	describe('Edit Icon', function() {
		it('should trigger an event', function() {
			var listItem = new ListItem();
			spyOn(Vent, 'trigger');
			listItem.editIconEvent();

			expect(Vent.trigger).toHaveBeenCalledWith('edit:genre', listItem.model);
		});
	});

	describe('Delete Icon', function() {
		it('should trigger an event', function() {
			var listItem = new ListItem();
			spyOn(Vent, 'trigger');
			listItem.deleteIconEvent();

			expect(Vent.trigger).toHaveBeenCalledWith('delete:genre', listItem.model);
		});
	});
});