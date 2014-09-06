var GenresService = require(__dirname + '/../services/genres');

var GenreController = function (db) {
    this.genresService = new GenresService(db);

    this.getAction = function (req, res) {
        var id = req.param('genre_id') || '',
            errors = this.genresService.validate(id, [], {});

        if (errors.length > 0) {
            res.set('Content-Type', 'application/json');
            res.send(400, {
                errors: errors
            });
        } else {
            this.genresService.get(id, function (data) {
                res.set('Content-Type', 'application/json');
                res.send(200, data);
            });
        }
    };

    this.putAction = function (req, res) {
        var id = req.param('genre_id') || '',
            data = {
                name: req.body.name || ''
            },
            errors = this.genresService.validate(id, ['name'], data);

        if (errors.length > 0) {
            res.set('Content-Type', 'application/json');
            res.send(400, {
                errors: errors
            });
        } else {
            this.genresService.update(id, data, function (data) {
                res.set('Content-Type', 'application/json');
                res.send(200, data);
            });
        }
    };

    this.deleteAction = function (req, res) {
        var id = req.param('genre_id') || '',
            errors = this.genresService.validate(id, [], {});

        if (errors.length > 0) {
            res.set('Content-Type', 'application/json');
            res.send(400, {
                errors: errors
            });
        } else {
            this.genresService.remove(id, function () {
                res.set('Content-Type', 'application/json');
                res.send(200, {});
            });
        }
    };
};

module.exports = GenreController;
