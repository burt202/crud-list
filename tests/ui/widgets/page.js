'use strict';

module.exports = function () {

    this.Widgets.Page = this.Widget.extend({
        root: 'body',

        getTitle: function () {
            return this.find('h1.title').then(function (el) {
                return el.getText();
            });
        }
  });
};
