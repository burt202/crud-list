## CRUD List App

A simple NodeJS app, that I am using as a playground to try out and new technologies and frameworks. Expect the list below to grow.

### Technologies Used

* Server-side - [NodeJS](http://nodejs.org/)
* Database - [MongoDB](http://www.mongodb.org/)
* Client-side - [BackboneJS](http://backbonejs.org/) (with [MarionetteJS](http://marionettejs.com/)), [RequireJS](http://requirejs.org/)
* Task Runner - [GulpJS](http://gulpjs.com/)
* Client-side testing - [Mocha](http://visionmedia.github.io/mocha/), [Chai](http://chaijs.com/) and [Sinon](http://sinonjs.org/)
* Client-side dependency manager - [Bower](http://bower.io/)
* API documentation - [Swagger UI](https://github.com/wordnik/swagger-ui)
* API testing - [Supertest](https://github.com/visionmedia/supertest)

### Installation

* Make sure NodeJS and MongoDB are installed
* Run `npm install` and `bower install` for dependencies
* Start app by running `gulp`

### Useful Gulp Tasks

* `gulp build` - to bundle javascript and change config setting to `production`
* `gulp client-tests` - to run client-side unit tests

### API Documentation

* After running `bower install`, edit `/public/bower_components/swagger-ui/dist/index.html` and change the url towards the top of the file to `http://node.github.dev:8000/api-desc/`
* Then go to `http://node.github.dev:8000/api-docs/` in a browser