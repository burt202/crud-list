var fs = require('fs');
var config = JSON.parse(fs.readFileSync(__dirname + '/../../configs/app.json', 'utf8'));
var setup = require('../api/init');

module.exports = {
    setup: function (test) {
        setup.connectAndCleanDatabase().then(function () {
            test.done();
        });
    },

    'Genres List': function (test) {
        var menu = '#nav';
        var genresMenuLink = '#nav li.genres a';
        var genresListItems = '#genres-list li';
        var genresListEmptyItem = '#genres-list li.empty-row';
        var genresCountDisplay = '#genres-list-options span';
        var newButton = '#show-add-genre-form';
        var genreForm = '#genre-form';
        var cancelButton = '#cancel-btn';
        var addButton = '#add-genre-btn';
        var genreFormError = '#genre-form .error';
        var nameInput = '#genre-form input#name';
        var notification = '.notification';
        var genreListItem1Name = '#genres-list li:nth-child(1) span.genre-name';
        var genreListItem2Name = '#genres-list li:nth-child(2) span.genre-name';
        var genreListItem3Name = '#genres-list li:nth-child(3) span.genre-name';

        test
            .open('http://' + config.domain + ':' + config.port)

            // EMPTY LIST

            .waitForElement(menu)
            .click(genresMenuLink)
            .assert.numberOfElements(genresListItems, 1, 'List has 1 item')
            .assert.exists(genresListEmptyItem, 'List item is empty row')
            .assert.text(genresListEmptyItem, 'No items', 'Empty message is shown')
            .assert.text(genresCountDisplay, '0 genres', 'Genre count correct')

            // VALIDATION

            .click(newButton)
            .wait(401)
            .assert.visible(genreForm, 'Form is visible')
            .click(cancelButton)
            .wait(401)
            .assert.doesntExist(genreForm, 'Form is not visible')
            .click(newButton)
            .wait(401)
            .click(addButton)
            .assert.exists(genreFormError, 'Error is shown')
            .assert.text(genreFormError, 'You must complete this field', 'Error message is correct')
            .click(nameInput)
            .assert.doesntExist(genreFormError, 'Error removed on input click')

            // ADD ROCK

            .type(nameInput, 'Rock')
            .click(addButton)
            .assert.chain()
                .query(notification)
                    .exists('Notification shown')
                    .text('Genre Added')
                    .attr('class').to.contain('notification-success', 'Notification is a success message')
                .end()
            .end()
            .wait(1000)
            .assert.doesntExist(genreForm, 'Form is not visible')
            .assert.text(genresCountDisplay, '1 genre', 'Genre count correct')
            .assert.numberOfElements(genresListItems, 1, 'List has 1 item')
            .assert.doesntExist(genresListEmptyItem, 'List item is empty row')

            // ADD JAZZ AND FOLK

            .click(newButton)
            .wait(401)
            .type(nameInput, 'Jazz')
            .click(addButton)
            .wait(1000)
            .click(newButton)
            .wait(401)
            .type(nameInput, 'Folk')
            .click(addButton)
            .wait(1000)
            .assert.text(genresCountDisplay, '3 genres', 'Genre count correct')
            .assert.numberOfElements(genresListItems, 3, 'List has 3 items')

            // CORRECT ORDER

            .assert.text(genreListItem1Name, 'Folk', 'List item one correct')
            .assert.text(genreListItem2Name, 'Jazz', 'List item two correct')
            .assert.text(genreListItem3Name, 'Rock', 'List item three correct')
        .done();
    }
};
