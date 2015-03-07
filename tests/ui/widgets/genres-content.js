'use strict';

module.exports = function () {

  this.Widgets.GenresContent = this.Widget.extend({
    root: '.genres-content',

    getGenresTotalText: function () {
      return this.find('#genres-list-options span').then(function (el) {
        return el.getText();
      });
    },

    newButtonClick: function () {
      return this.find('#genres-list-options #show-add-genre-form').then(function (el) {
        return el.click();
      });
    }
  });
};
