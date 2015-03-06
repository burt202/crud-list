module.exports = function () {
    this.When(/^I update the genre with row index (\d+)$/, function (index) {
        var genresList = new this.Widgets.GenresList();
        return genresList.updateGenre(parseInt(index, 10));
    });

    this.Then(/^I should see that the name input is pre\-populated with "([^"]*)"$/, function (value) {
      var genresForm = new this.Widgets.GenresForm();
      return genresForm.getNameInputValue().should.eventually.eql(value);
    });

    this.When(/^I clear the name input$/, function () {
      var genresForm = new this.Widgets.GenresForm();
      return genresForm.clearName();
    });

    this.When(/^I click the update button$/, function () {
        this.driver.sleep(500);
        var genresForm = new this.Widgets.GenresForm();
        return genresForm.updateButtonClick();
    });
};
