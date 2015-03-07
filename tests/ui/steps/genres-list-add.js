'use strict';

module.exports = function () {
    this.When(/^I click the new button$/, function () {
        this.driver.sleep(500);
        var genresContent = new this.Widgets.GenresContent();
        return genresContent.newButtonClick();
    });

    this.When(/^I click the cancel button$/, function () {
        var genresForm = new this.Widgets.GenresForm();
        return genresForm.cancelButtonClick();
    });

    this.Then(/^I should not see the genres form$/, function () {
        var genresForm = new this.Widgets.GenresForm();
        return genresForm.isVisible().should.eventually.eql(false);
    });

    this.When(/^I click the add button$/, function () {
        this.driver.sleep(500);
        var genresForm = new this.Widgets.GenresForm();
        return genresForm.addButtonClick();
    });

    this.When(/^I focus on the name input$/, function () {
        var genresForm = new this.Widgets.GenresForm();
        return genresForm.nameInputClick();
    });

    this.Then(/^I should not see the validation error$/, function () {
        var genresForm = new this.Widgets.GenresForm();
        return genresForm.errorShown().should.eventually.eql(false);
    });
};
