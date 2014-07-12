var request = require('supertest');
var expect = require('chai').expect;
var setup = require('../init');

describe('Genre API', function () {
    var genre;

    before(function (done) {
        console.log("BEFORE");
        setup.connectAndCleanDatabase().then(done);
        console.log("AFTER");
    });

    it('should create a genre', function (done) {
        console.log("IT1");
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
        console.log("IT2");
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
});
