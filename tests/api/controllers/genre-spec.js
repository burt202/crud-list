'use strict';

var request = require('supertest');
var expect = require('chai').expect;
var setup = require('../init');

describe('Genre API', function () {
    var genre;

    before(function (done) {
        setup.connectAndCleanDatabase().then(done);
    });

    it('should return error if invalid id is given on GET', function (done) {
        request(setup.apiUrl)
            .get('/genres/invalid-id')
            .end(function(err, res) {
                expect(res.status).to.equal(400);
                expect(res.type).to.equal('application/json');
                expect(res.body).to.deep.equal({
                    errors: [
                        {
                            field: 'id',
                            message: 'You must provide a valid id'
                        }
                    ]
                });

                done();
            });
    });

    it('should create a genre', function (done) {
        request(setup.apiUrl)
            .post('/genres')
            .send({name: 'foobar'})
            .end(function(err, res) {
                genre = res.body;

                expect(res.status).to.equal(201);
                expect(res.type).to.equal('application/json');
                expect(genre).to.be.an('object');
                expect(genre._id).to.be.a('string').with.length(24);
                expect(genre.name).to.equal('foobar');

                done();
            });
    });

    it('should return genre by id', function (done) {
        request(setup.apiUrl)
            .get('/genres/' + genre._id)
            .end(function(err, res) {
                expect(res.status).to.equal(200);
                expect(res.type).to.equal('application/json');
                expect(res.body).to.deep.equal({
                    _id: genre._id,
                    name: genre.name
                });

                done();
            });
    });

    it('should return validation errors on PUT', function (done) {
        request(setup.apiUrl)
            .put('/genres/invalid-id')
            .send({name: ''})
            .end(function(err, res) {
                expect(res.status).to.equal(400);
                expect(res.type).to.equal('application/json');
                expect(res.body).to.deep.equal({
                    errors: [
                        {
                            field: 'id',
                            message: 'You must provide a valid id'
                        },
                        {
                            field: 'name',
                            message: 'You must complete this field'
                        }
                    ]
                });

                done();
            });
    });

    it('should update previously created genre', function (done) {
        request(setup.apiUrl)
            .put('/genres/' + genre._id)
            .send({name: 'new-name'})
            .end(function(err, res) {
                expect(res.status).to.equal(200);
                expect(res.type).to.equal('application/json');
                expect(res.body).to.deep.equal({
                  'name': 'new-name'
                });

                done();
            });
    });

    it('should return genre by id with updated data', function (done) {
        request(setup.apiUrl)
            .get('/genres/' + genre._id)
            .end(function(err, res) {
                expect(res.status).to.equal(200);
                expect(res.type).to.equal('application/json');
                expect(res.body).to.deep.equal({
                    _id: genre._id,
                    name: 'new-name'
                });

                done();
            });
    });

    it('should return error if invalid id is given on DELETE', function (done) {
        request(setup.apiUrl)
            .del('/genres/invalid-id')
            .end(function(err, res) {
                expect(res.status).to.equal(400);
                expect(res.type).to.equal('application/json');
                expect(res.body).to.deep.equal({
                    errors: [
                        {
                            field: 'id',
                            message: 'You must provide a valid id'
                        }
                    ]
                });

                done();
            });
    });

    it('should delete previously created genre', function (done) {
        request(setup.apiUrl)
            .del('/genres/' + genre._id)
            .end(function(err, res) {
                expect(res.status).to.equal(200);
                expect(res.type).to.equal('application/json');
                expect(res.body).to.deep.equal({});

                done();
            });
    });

    it('should not be able to find genre as it is not deleted', function (done) {
        request(setup.apiUrl)
            .get('/genres/' + genre._id)
            .end(function(err, res) {
                expect(res.status).to.equal(200);
                expect(res.type).to.equal('application/json');
                expect(res.body).to.deep.equal({});

                done();
            });
    });
});
