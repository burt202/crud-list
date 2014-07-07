var frisby = require('frisby');

describe('Genre API', function () {
    var apiUrl;

    beforeEach(function (done) {
        require('../init').then(function (options) {
            apiUrl = options.apiUrl;
        }).then(done);
    });

    it('should validate genre on creation', function () {
        frisby.create('POST validation')
            .post(apiUrl + '/genres', {name: ''})
            .expectStatus(400)
            .expectHeaderContains('content-type', 'application/json')
            .expectJSON({
                errors: [
                    {
                        field: 'name',
                        message: 'You must complete this field'
                    }
                ]
            })
        .toss();
    });

    it('should create genres and then list them', function () {
        frisby.create('create first genre')
            .post(apiUrl + '/genres', {name: 'foobar'})
            .expectStatus(201)
            .expectHeaderContains('content-type', 'application/json')
            .expectJSON({
                _id: function (val) { expect(val).toEqual(jasmine.any(String)); },
                name: 'foobar'
            })
            .afterJSON(function (genre1) {
                frisby.create('create second genre')
                    .post(apiUrl + '/genres', {name: 'abc123'})
                    .expectStatus(201)
                    .expectHeaderContains('content-type', 'application/json')
                    .expectJSON({
                        _id: function (val) { expect(val).toEqual(jasmine.any(String)); },
                        name: 'abc123'
                    })
                    .afterJSON(function (genre2) {
                        frisby.create('GET genres')
                            .get(apiUrl + '/genres')
                            .expectStatus(200)
                            .expectHeaderContains('content-type', 'application/json')
                            .expectJSON([
                                {
                                    _id: genre2._id,
                                    name: genre2.name   // genre2 first because of alphabetical order
                                },
                                {
                                    _id: genre1._id,
                                    name: genre1.name
                                }
                            ])
                        .toss();
                    })
                .toss();
            })
        .toss();
    });
});
