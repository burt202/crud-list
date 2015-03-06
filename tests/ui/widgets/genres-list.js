module.exports = function () {

  this.Widgets.GenresList = this.Widget.List.extend({
    root: '#genres-list',
    itemSelector: 'li',

    deleteGenre: function (index) {
      return this.clickAt({
        selector: 'span.delete-genre-btn',
        index: index
      });
    },

    updateGenre: function (index) {
      return this.clickAt({
        selector: 'span.show-edit-genre-form',
        index: index
      });
    },

    emptyRowVisible: function () {
      return this.at(0).then(function (el) {
        return el.hasClass('empty-row');
      });
    },

    getGenreText: function (index) {
      return this.at(index).then(function (el) {
        return el.getText();
      });
    },
  });
};
