var fs = require('fs');
var config = JSON.parse(fs.readFileSync(__dirname + '/../../configs/app.json', 'utf8'));
var setup = require('../api/init');

module.exports = {
    setup: function (test) {
        setup.connectAndCleanDatabase().then(function () {
            test.done();
        });
    },

    'Genres List Update': function (test) {
        var menu = '#nav';
        var genresMenuLink = '#nav li.genres a';
        var newButton = '#show-add-genre-form';
        var addButton = '#add-genre-btn';
        var editButton = '#update-genre-btn';
        var nameInput = '#genre-form input#name';
        var jazzEditButton = '#genres-list li:nth-child(1) span.show-edit-genre-form';
        var jazzNameSpan = '#genres-list li:nth-child(1) span.genre-name';
        var genreForm = '#genre-form';
        var formTitle = '#genre-form-container h2';

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

            // UPDATE JAZZ

            .click(jazzEditButton)
            .wait(401)
            .assert.visible(genreForm, 'Form is visible')
            .assert.text(formTitle, 'Update Jazz', 'Form title is correct')
            .type(nameInput, 'Jazzier')
            .click(editButton)
            .wait(1000)
            .assert.text(jazzNameSpan, 'Jazzier', 'Jazz updated')
            .reload()
            .assert.text(jazzNameSpan, 'Jazzier', 'Update persisted')

        .done();
    }
};
