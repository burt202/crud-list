define([
	'app/views/genres/form',
	'app/views/genres/vent'
], function (Form, Vent) {

	describe('Genre Form', function() {
		describe('Basic Instantiation', function() {
			it('should be able to be instantiated', function() {
				var form = new Form();

				expect(form).toBeTruthy();
			});
		});

		describe('Add Button', function() {
			it('should trigger an event', function() {
				spyOn(Form.prototype, 'serializeData').andReturn({title: '', action: ''});
				var form = new Form();
				form.render();
				form.ui.nameInput.val('foobar');
				spyOn(Vent, 'trigger');
				form.addButton();

				expect(Vent.trigger).toHaveBeenCalledWith('add:genre', form.model, {name: 'foobar'}, form.$el);
			});
		});

		describe('Update Button', function() {
			it('should trigger an event', function() {
				spyOn(Form.prototype, 'serializeData').andReturn({title: '', action: ''});
				var form = new Form();
				form.render();
				form.ui.nameInput.val('foobar');
				spyOn(Vent, 'trigger');
				form.updateButton();

				expect(Vent.trigger).toHaveBeenCalledWith('update:genre', form.model, {name: 'foobar'}, form.$el);
			});
		});

		describe('Cancel Button', function() {
			it('should trigger an event', function() {
				var form = new Form();
				spyOn(Vent, 'trigger');
				form.cancelButton();

				expect(Vent.trigger).toHaveBeenCalledWith('hide:genre-form');
			});
		});
	});
});