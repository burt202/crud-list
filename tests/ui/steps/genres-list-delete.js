'use strict';

module.exports = function () {
    this.When(/^I delete the genre with row index (\d+)$/, function (index) {
        var genresList = new this.Widgets.GenresList();
        return genresList.deleteGenre(parseInt(index, 10));
    });
};
