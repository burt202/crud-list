var request = require('supertest');
var expect = require('chai').expect;
var setup = require('../init');

describe('Genres API', function () {
    var genre1;
    var genre2;

    before(function (done) {
        setup.connectAndCleanDatabase().then(done);
    });

    it('should validate genre on creation', function (done) {
        request(setup.apiUrl)
            .post('/genres')
            .send({name: ''})
            .end(function(err, res) {
                expect(res.status).to.equal(400);
                expect(res.type).to.equal('application/json');
                expect(res.body).to.deep.equal({
                    errors: [
                        {
                            field: 'name',
                            message: 'You must complete this field'
                        }
                    ]
                });
                done();
            });
    });

    it('should create first genre', function (done) {
        request(setup.apiUrl)
            .post('/genres')
            .send({name: 'foobar'})
            .end(function(err, res) {
                genre1 = res.body;

                expect(res.status).to.equal(201);
                expect(res.type).to.equal('application/json');
                expect(genre1).to.be.an('object');
                expect(genre1._id).to.be.a('string').with.length(24);
                expect(genre1.name).to.equal('foobar');

                done();
            });
    });

    it('should create second genre', function (done) {
        request(setup.apiUrl)
            .post('/genres')
            .send({name: 'abc123'})
            .end(function(err, res) {
                genre2 = res.body;

                expect(res.status).to.equal(201);
                expect(res.type).to.equal('application/json');
                expect(genre2).to.be.an('object');
                expect(genre2._id).to.be.a('string').with.length(24);
                expect(genre2.name).to.equal('abc123');

                done();
            });
    });

    it('should return all genres', function (done) {
        request(setup.apiUrl)
            .get('/genres')
            .end(function(err, res) {
                expect(res.status).to.equal(200);
                expect(res.type).to.equal('application/json');
                expect(res.body).to.deep.equal([
                    {
                        _id: genre2._id,
                        name: genre2.name   // genre2 first because of alphabetical order
                    },
                    {
                        _id: genre1._id,
                        name: genre1.name
                    }
                ]);

                done();
            });
    });
});
