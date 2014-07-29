var fs = require('fs');
var config = JSON.parse(fs.readFileSync(__dirname + '/../../configs/app.json', 'utf8'));

module.exports = {
    'Navigation': function (test) {
        var menu = '#nav';
        var menuItems = '#nav li';
        var homeMenuListItem = '#nav li.home';
        var genresMenuListItem = '#nav li.genres';
        var pageTitle = 'h1.title';
        var homeMenuLink = '#nav li.home a';
        var genresMenuLink = '#nav li.genres a';

        test
            .open('http://' + config.domain + ':' + config.port)
            .waitForElement(menu)
            .assert.numberOfElements(menuItems, 2, 'Has 2 links')
            .assert.attr(homeMenuListItem, 'class').to.contain('active', 'Home link is active')
            .assert.text(pageTitle, 'Home', 'Content title is correct')
            .click(genresMenuLink)
            .assert.attr(genresMenuListItem, 'class').to.contain('active', 'Genre link is active')
            .assert.text(pageTitle, 'Genres', 'Content title is correct')
            .click(homeMenuLink)
            .assert.attr(homeMenuListItem, 'class').to.contain('active', 'Home link is active')
            .assert.text(pageTitle, 'Home', 'Content title is correct')
        .done();
    }
};
