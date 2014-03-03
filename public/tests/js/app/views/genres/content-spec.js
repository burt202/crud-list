var requirejs = require('requirejs');
require('../../../../init');

var Backbone = requirejs('backbone'),
	Content = requirejs('app/views/genres/content'),
	Vent = requirejs('app/views/genres/vent');

describe('Genre Content', function() {
	describe('Basic Instantiation', function() {
		it('should be able to be instantiated', function() {
			var content = new Content();

			expect(content).toBeTruthy();
		});
	});

	describe('Empty Collection', function() {
		it('should show `no items` message', function() {
			var content = new Content({
				collection: new Backbone.Collection([])
			});
			content.render();

			expect(content.$(content.itemViewContainer).html()).toEqual('<li>No items</li>');
		});
	});

	describe('Template Data', function() {
		it('should return correctly', function() {
			var content = new Content({
				collection: new Backbone.Collection([{}, {}])
			}),
			actual = content.serializeData(),
			expected = {
				genreCount: 2
			};

			expect(actual).toEqual(expected);
		});
	});

	describe('New Button', function() {
		it('should trigger an event', function() {
			var content = new Content();
			spyOn(Vent, 'trigger');
			content.newButton();

			expect(Vent.trigger).toHaveBeenCalledWith('new:genre');
		});
	});
});