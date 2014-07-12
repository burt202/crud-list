var express = require('express'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    Database = require(__dirname + '/server/database'),
    IndexController = require(__dirname + '/server/index'),
    config = JSON.parse(fs.readFileSync(__dirname + '/configs/app.json', 'utf8')),
    app = express(),
    databaseName = process.argv[2] ? config.testDatabaseName : config.databaseName,
    database = new Database(config.databaseHost + ':' + config.databasePort, databaseName);

database.connect(['genres'])
    .then(function () {
        var controller = new IndexController(config),
            apiRoutes = require(__dirname + '/server/api-routes')(config, database);

        /*jshint -W030 */
        app.use(bodyParser()),
        app.use(express.static(__dirname + '/public'));

        app.use('/api', apiRoutes);
        app.get('/api-desc', controller.apiDesc.bind(controller));
        app.get('/api-docs', controller.apiDocs.bind(controller));
        app.get('*', controller.load.bind(controller));

        app.listen(config.port, config.domain);

        console.log('App running at http://' + config.domain + ':' + config.port);
        console.log('API docs running at http://' + config.domain + ':' + config.port + '/api-docs');
        console.log('Database Name: ' + databaseName);
    })
    .fail(function (/* err */) {
        console.log('There was an error connecting to the database');
    });
