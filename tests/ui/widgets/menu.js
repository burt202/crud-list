'use strict';

module.exports = function () {

  this.Widgets.Menu = this.Widget.List.extend({
    root: '#nav',
    itemSelector: 'li',

    isActive: function (index) {
      return this.at(index).then(function (el) {
        return el.hasClass('active');
      });
    },

    navigate: function (index) {
      return this.clickAt({
        selector: 'a',
        index: index
      });
    }
  });
};
