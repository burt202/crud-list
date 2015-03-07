'use strict';

module.exports = function () {

  this.Widgets.GenresForm = this.Widget.extend({
    root: '#genre-form-container',

    getTitle: function () {
      return this.find('h2').then(function (el) {
        return el.getText();
      });
    },

    nameInputClick: function () {
      return this.find('#name').then(function (el) {
        return el.click();
      });
    },

    typeName: function (name) {
      return this.fill({
        selector: '#name',
        value: name
      });
    },

    clearName: function () {
      return this.clear({
        selector: '#name'
      });
    },

    getNameInputValue: function () {
      return this.getValue({
        selector: '#name'
      });
    },

    cancelButtonClick: function () {
      return this.find('#cancel-btn').then(function (el) {
        return el.click();
      });
    },

    addButtonClick: function () {
      return this.find('#add-genre-btn').then(function (el) {
        return el.click();
      });
    },

    updateButtonClick: function () {
      return this.find('#update-genre-btn').then(function (el) {
        return el.click();
      });
    },

    errorShown: function () {
      return this.isVisible('.error');
    }
  });
};
