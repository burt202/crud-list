'use strict';

var fs = require('fs');
var config = JSON.parse(fs.readFileSync(__dirname + '/../../../configs/app.json', 'utf8'));

module.exports = function () {
    this.Given(/^I visit CRUD-list App Home Page$/, function () {
        this.driver.get('http://' + config.domain + ':' + config.port);
    });

    this.Then(/^I should see 2 menu links$/, function () {
        var menu = new this.Widgets.Menu();
        return menu.length().should.eventually.eql(2);
    });

    this.Then(/^I should see that the home link is active$/, function () {
        var menu = new this.Widgets.Menu();
        return menu.isActive(0).should.eventually.eql(true);
    });

    this.Then(/^I should see that the home title is visible$/, function () {
        var page = new this.Widgets.Page();
        return page.getTitle().should.eventually.eql('Home');
    });

    this.When(/^I click the genre menu item$/, function() {
        var menu = new this.Widgets.Menu();
        return menu.navigate(1);
    });

    this.Then(/^I should see that the genre link is active$/, function() {
        var menu = new this.Widgets.Menu();
        return menu.isActive(1).should.eventually.eql(true);
    });

    this.When(/^I click the home menu item$/, function() {
        var menu = new this.Widgets.Menu();
        return menu.navigate(0);
    });

    this.Then(/^I should see that the genre title is visible$/, function() {
        var page = new this.Widgets.Page();
        return page.getTitle().should.eventually.eql('Genres');
    });
};
