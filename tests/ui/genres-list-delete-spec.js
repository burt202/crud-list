var fs = require('fs');
var config = JSON.parse(fs.readFileSync(__dirname + '/../../configs/app.json', 'utf8'));
var setup = require('../api/init');

module.exports = {
    setup: function (test) {
        setup.connectAndCleanDatabase().then(function () {
            test.done();
        });
    },

    'Genres List Delete': function (test) {
        var menu = '#nav';
        var genresMenuLink = '#nav li.genres a';
        var newButton = '#show-add-genre-form';
        var addButton = '#add-genre-btn';
        var nameInput = '#genre-form input#name';
        var jazzDeleteButton = '#genres-list li:nth-child(1) span.delete-genre-btn';
        var notification = '.notification';
        var genresListItems = '#genres-list li';
        var genresListEmptyItem = '#genres-list li.empty-row';
        var genresCountDisplay = '#genres-list-options span';

        test
            .open('http://' + config.domain + ':' + config.port)
            .waitForElement(menu)
            .click(genresMenuLink)

            // ADD JAZZ

            .click(newButton)
            .wait(401)
            .type(nameInput, 'Jazz')
            .click(addButton)
            .wait(1000)

            // DELETE JAZZ

            .click(jazzDeleteButton)
            .assert.chain()
                .query(notification)
                    .exists('Notification shown')
                    .text('Genre Deleted', 'Notification text is correct')
                    .attr('class').to.contain('notification-success', 'Notification is a success message')
                .end()
            .end()
            .wait(1000)
            .assert.numberOfElements(genresListItems, 1, 'List has 1 item')
            .assert.exists(genresListEmptyItem, 'List item is empty row')
            .assert.text(genresCountDisplay, '0 genres', 'Genre count correct')
            .reload()
            .assert.numberOfElements(genresListItems, 1, 'List has 1 item')
            .assert.exists(genresListEmptyItem, 'List item is empty row')

        .done();
    }
};
