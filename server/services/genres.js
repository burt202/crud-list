var mongodb = require('mongodb');
var q = require('q');

var GenresService = function (db) {
    this.db = db;

    this.validate = function (id, required, data) {
        var errors = [];

        if (id && !this.isValidObjectID(id)) {
            errors.push({
                field: 'id',
                message: 'You must provide a valid id'
            });
        }

        required.forEach(function (fieldName) {
            if (!data[fieldName]) {
                errors.push({
                    field: 'name',
                    message: 'You must complete this field'
                });
            }
        });

        return errors;
    };

    this.isValidObjectID = function (str) {
        var len = str.length,
            valid = false;

        if (len === 12 || len === 24) {
            valid = /^[0-9a-fA-F]+$/.test(str);
        }

        return valid;
    };

    this.getAll = function () {
        var deferred = q.defer();

        this.db.genres.find()
            .sort({ name: 1 })
            .toArray(function (err, data) {
                deferred.resolve(data);
            });

        return deferred.promise;
    };

    this.get = function (id) {
        var deferred = q.defer();

        this.db.genres.find({_id: new mongodb.ObjectID(id)}).toArray(function (err, data) {
            deferred.resolve(data[0]);
        });

        return deferred.promise;
    };

    this.add = function (data) {
        var deferred = q.defer();

        this.db.genres.insert(data, {safe: true}, function (err, data) {
            deferred.resolve(data[0]);
        });

        return deferred.promise;
    };

    this.update = function (id, data) {
        var deferred = q.defer();

        this.db.genres.update({_id: new mongodb.ObjectID(id)}, data, function () {
            deferred.resolve(data);
        });

        return deferred.promise;
    };

    this.remove = function (id) {
        var deferred = q.defer();

        this.db.genres.remove({_id: new mongodb.ObjectID(id)}, function() {
            deferred.resolve();
        });

        return deferred.promise;
    };
};

module.exports = GenresService;
