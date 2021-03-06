'use strict';

var q = require('q'),
    MongoClient = require('mongodb').MongoClient,
    _ = require('underscore');

var Database = function (server, database) {
    this.server = server;
    this.database = database;
};

Database.prototype.connect = function (collections) {
    var self = this;
    var connectionString = 'mongodb://' + this.server + '/' + this.database;
    this.collections = collections;

    return q.nfcall(MongoClient.connect, connectionString)
        .then(function(db) {
            _.each(collections, function(collection) {
                self[collection] = db.collection(collection);
            });

            return db;
        });
};

Database.prototype.clean = function () {
    var self = this;
    var promises = [];

    _.each(this.collections, function(collection) {
        var promise = q.defer();
        promises.push(promise);

        self[collection].remove({}, function () {
            promise.resolve(true);
        });
    });

    return q.all(promises);
};

module.exports = Database;
