var GenresService = require(__dirname + '/../services/genres');

var GenresController = function (db) {
    this.genresService = new GenresService(db);

    this.getAction = function (req, res) {
        this.genresService.getAll()
            .then(function (data) {
                res.set('Content-Type', 'application/json');
                res.status(200).send(data);
            })
            .done();
    };

    this.postAction = function (req, res) {
        var data = {
                name: req.body.name || ''
            },
            errors = this.genresService.validate(null, ['name'], data);

        if (errors.length > 0) {
            res.set('Content-Type', 'application/json');
            res.status(400).send({
                errors: errors
            });
        } else {
            this.genresService.add(data)
                .then(function (data) {
                    res.set('Content-Type', 'application/json');
                    res.status(201).send(data);
                })
                .done();
        }
    };
};

module.exports = GenresController;
