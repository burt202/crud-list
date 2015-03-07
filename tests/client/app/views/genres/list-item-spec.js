'use strict';

var requirejs = require('../../../specrunner-requirejs');
require('../../../specrunner-jquery');

var expect = require('chai').expect; /* jshint expr:true */
var sinon = require('sinon');
var ListItem = requirejs('app/views/genres/list-item');
var Vent = requirejs('app/views/genres/vent');

describe('Genre List Item', function() {
    describe('Basic Instantiation', function() {
        it('should be able to be instantiated', function() {
            var listItem = new ListItem();

            expect(listItem).to.be.defined;
        });
    });

    describe('Edit Icon', function() {
        it('should trigger an event', function() {
            var listItem = new ListItem();
            var spy = sinon.spy(Vent, 'trigger');
            listItem.editIconEvent();

            expect(spy.calledWith('edit:genre', listItem.model)).to.be.true;
            Vent.trigger.restore();
        });
    });

    describe('Delete Icon', function() {
        it('should trigger an event', function() {
            var listItem = new ListItem();
            var spy = sinon.spy(Vent, 'trigger');
            listItem.deleteIconEvent();

            expect(spy.calledWith('delete:genre', listItem.model)).to.be.true;
            Vent.trigger.restore();
        });
    });
});
