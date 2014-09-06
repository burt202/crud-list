var GenresService = require(__dirname + '/../services/genres');

var GenreController = function (db) {
    this.genresService = new GenresService(db);

    this.getAction = function (req, res) {
        var id = req.param('genre_id') || '',
            errors = this.genresService.validate(id, [], {});

        if (errors.length > 0) {
            res.set('Content-Type', 'application/json');
            res.status(400).send({
                errors: errors
            });
        } else {
            this.genresService.get(id)
                .then(function (data) {
                    res.set('Content-Type', 'application/json');
                    res.status(200).send(data);
                })
                .done();
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
            res.status(400).send({
                errors: errors
            });
        } else {
            this.genresService.update(id, data)
                .then(function (data) {
                    res.set('Content-Type', 'application/json');
                    res.status(200).send(data);
                })
                .done();
        }
    };

    this.deleteAction = function (req, res) {
        var id = req.param('genre_id') || '',
            errors = this.genresService.validate(id, [], {});

        if (errors.length > 0) {
            res.set('Content-Type', 'application/json');
            res.status(400).send({
                errors: errors
            });
        } else {
            this.genresService.remove(id)
                .then(function () {
                    res.set('Content-Type', 'application/json');
                    res.status(200).send({});
                })
                .done();
        }
    };
};

module.exports = GenreController;
