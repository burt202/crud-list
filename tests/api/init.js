var fs = require('fs'),
    q = require('q'),
    Database = require('../../server/database'),
    config = JSON.parse(fs.readFileSync(__dirname + '/../../configs/app.json', 'utf8')),
    database = new Database(config.databaseHost + ':' + config.databasePort, config.testDatabaseName);

var connectAndCleanDatabase = function () {
    var deferred = q.defer();

    database.connect(['genres'])
        .then(database.clean.bind(database))
        .then(function () {
            deferred.resolve();
        });

    return deferred.promise;
};

module.exports = {
    connectAndCleanDatabase: connectAndCleanDatabase,
    apiUrl: 'http://' + config.domain + ':' + config.port + '/api'
};
