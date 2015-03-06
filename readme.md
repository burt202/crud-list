## CRUD List App

A simple NodeJS app, that I am using as a playground to try out and new technologies and frameworks.

### Technologies Currently Used

* Server-side - [NodeJS](http://nodejs.org/)
* Database - [MongoDB](http://www.mongodb.org/)
* Client-side - [BackboneJS](http://backbonejs.org/) (with [MarionetteJS](http://marionettejs.com/)), [RequireJS](http://requirejs.org/)
* Task Runner - [GulpJS](http://gulpjs.com/)
* Client-side testing - [Mocha](http://visionmedia.github.io/mocha/), [Chai](http://chaijs.com/) and [Sinon](http://sinonjs.org/)
* Client-side coverage - [Istanbul](http://gotwarlost.github.io/istanbul/)
* Client-side dependency manager - [Bower](http://bower.io/)
* API documentation - [Swagger UI](https://github.com/wordnik/swagger-ui)
* API testing - [Supertest](https://github.com/visionmedia/supertest)
* UI testing - [PioneerJS](http://pioneerjs.com/)

### Installation

* Make sure NodeJS and MongoDB are installed
* Run `npm install` and `bower install` for dependencies
* install gulp globally `sudo npm install -g gulp`
* Start app by running `gulp`

### Gulp Tasks

* see `gulpfile.js` for a list of available tasks

### API Documentation

* After running `bower install`, edit `/public/bower_components/swagger-ui/dist/index.html` and change the url towards the top of the file to `http://node.github.dev:8000/api-desc/`
* Then go to `http://node.github.dev:8000/api-docs/` in a browser