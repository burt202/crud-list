var fs = require('fs');
var config = JSON.parse(fs.readFileSync(__dirname + '/../../../configs/app.json', 'utf8'));
var setup = require('../../api/init');
var request = require('supertest');

module.exports = function () {
  this.Given(/^I visit CRUD\-list App Genres Page$/, function () {
    this.driver.get('http://' + config.domain + ':' + config.port + '#genres');
  });

  this.Given(/^I make sure that there are no genres in the db$/, function () {
    return setup.connectAndCleanDatabase();
  });

  this.Given(/^I inject the genre "([^"]*)" into the db$/, function (genreName) {
    return request(setup.apiUrl)
      .post('/genres')
      .send({ name: genreName })
      .end(function() {
        return true;
      });
  });

  this.Then(/^I should see a success notification$/, function () {
    var notification = new this.Widgets.Notification();
    return notification.isVisible().should.eventually.eql(true) &&
      notification.hasClass('notification-success').should.eventually.eql(true);
  });

  this.Then(/^I should see an empty genre list$/, function () {
    var genresList = new this.Widgets.GenresList();
    return genresList.length().should.eventually.eql(1) &&
      genresList.emptyRowVisible().should.eventually.eql(true);
  });

  this.Then(/^I should see the genres total count as "([^"]*)"$/, function (text) {
    var genresContent = new this.Widgets.GenresContent();
    return genresContent.getGenresTotalText().should.eventually.eql(text);
  });

  this.When(/^I refresh the page$/, function () {
    this.driver.navigate().refresh();
  });

  this.Then(/^I should see the genres form$/, function () {
    var genresForm = new this.Widgets.GenresForm();
    return genresForm.isVisible().should.eventually.eql(true);
  });

  this.Then(/^I should see the genres form title is "([^"]*)"$/, function (title) {
    var genresForm = new this.Widgets.GenresForm();
    return genresForm.getTitle().should.eventually.eql(title);
  });

  this.Then(/^I should see a validation error$/, function () {
    var genresForm = new this.Widgets.GenresForm();
    return genresForm.errorShown().should.eventually.eql(true);
  });

  this.When(/^I type "([^"]*)" in the name input$/, function (name) {
    this.driver.sleep(500);
    var genresForm = new this.Widgets.GenresForm();
    return genresForm.typeName(name);
  });

  this.Then(/^I should see the genre "([^"]*)" on row index "([^"]*)"$/, function (genre, rowIndex) {
    var genresList = new this.Widgets.GenresList();
    return genresList.getGenreText(parseInt(rowIndex, 10)).should.eventually.eql(genre);
  });

  this.Then(/^I should see that the genre list has (\d+) items$/, function (numberOfItems) {
    var genresList = new this.Widgets.GenresList();
    return genresList.length().should.eventually.eql(parseInt(numberOfItems, 10));
  });
};
