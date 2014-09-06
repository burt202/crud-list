var requirejs = require('../../../specrunner-requirejs');
require('../../../specrunner-jquery');

var expect = require('chai').expect; /* jshint expr:true */
var sinon = require('sinon');
var Backbone = requirejs('backbone');
var Content = requirejs('app/views/genres/content');
var Vent = requirejs('app/views/genres/vent');

describe('Genre Content', function() {
    describe('Basic Instantiation', function() {
        it('should be able to be instantiated', function() {
            var content = new Content();

            expect(content).to.be.defined;
        });
    });

    describe('Empty Collection', function() {
        it('should show `no items` message', function() {
            var content = new Content({
                collection: new Backbone.Collection([])
            });
            content.render();

            expect(content.$(content.childViewContainer).html()).to.equal('<li class="empty-row">No items</li>');
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

            expect(actual).to.deep.equal(expected);
        });
    });

    describe('New Button', function() {
        it('should trigger an event', function() {
            var content = new Content();
            var spy = sinon.spy(Vent, 'trigger');
            content.newButton();

            expect(spy.calledWith('new:genre')).to.be.true;
            Vent.trigger.restore();
        });
    });
});
