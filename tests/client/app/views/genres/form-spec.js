'use strict';

var requirejs = require('../../../specrunner-requirejs');
require('../../../specrunner-jquery');

var expect = require('chai').expect; /* jshint expr:true */
var sinon = require('sinon');
var Backbone = requirejs('backbone');
var Form = requirejs('app/views/genres/form');
var Vent = requirejs('app/views/genres/vent');

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
            expect(form).to.be.defined;
        });
    });

    describe('Add Button', function() {
        it('should trigger an event', function() {
            form.render();
            form.ui.nameInput.val('foobar');
            var spy = sinon.spy(Vent, 'trigger');
            form.addButton();

            expect(spy.calledWith('add:genre', form.model, {name: 'foobar'}, form.$el)).to.be.true;
            Vent.trigger.restore();
        });
    });

    describe('Update Button', function() {
        it('should trigger an event', function() {
            form.render();
            form.ui.nameInput.val('foobar');
            var spy = sinon.spy(Vent, 'trigger');
            form.updateButton();

            expect(spy.calledWith('update:genre', form.model, {name: 'foobar'}, form.$el)).to.be.true;
            Vent.trigger.restore();
        });
    });

    describe('Cancel Button', function() {
        it('should trigger an event', function() {
            var spy = sinon.spy(Vent, 'trigger');
            form.cancelButton();

            expect(spy.calledWith('hide:genre-form')).to.be.true;
            Vent.trigger.restore();
        });
    });
});
