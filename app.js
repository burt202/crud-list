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

        if (config.type === 'development') {
            app.get('/api-desc', controller.apiDesc.bind(controller));
            app.get('/api-docs', controller.apiDocs.bind(controller));
        }

        app.use('/api', apiRoutes);
        app.get('*', controller.load.bind(controller));

        app.listen(config.port, config.domain);

        var currDate = new Date();

        console.log('App running at http://' + config.domain + ':' + config.port);
        console.log('API docs running at http://' + config.domain + ':' + config.port + '/api-docs');
        console.log('Database Name: ' + databaseName);
        console.log('Timestamp: ' + currDate.today() + ' ' + currDate.timeNow());
    })
    .fail(function (/* err */) {
        console.log('There was an error connecting to the database');
    });

/* jshint freeze:false */
Date.prototype.today = function () {
    return ((this.getDate() < 10) ? '0' : '') + this.getDate() + '/' + (((this.getMonth() + 1) < 10) ? '0' : '') + (this.getMonth() + 1) + '/' + this.getFullYear();
};

Date.prototype.timeNow = function () {
    return ((this.getHours() < 10) ? '0' : '') + this.getHours() + ':' + ((this.getMinutes() < 10) ? '0' : '') + this.getMinutes() + ':' + ((this.getSeconds() < 10) ? '0' : '') + this.getSeconds();
};
