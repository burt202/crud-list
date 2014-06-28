## CRUD List App

Uses [NodeJS](http://nodejs.org/), [MongoDB](http://www.mongodb.org/), [BackboneJS](http://backbonejs.org/) (with [MarionetteJS](http://marionettejs.com/)), [RequireJS](http://requirejs.org/), [GulpJS](http://gulpjs.com/), [Jasmine](http://pivotal.github.io/jasmine/), [Bower](http://bower.io/) & [Swagger UI](https://github.com/wordnik/swagger-ui)

### Installation

* Make sure NodeJS and MongoDB are installed
* Run `npm install` and `bower install` for dependencies
* Start app by running `gulp`

### Production Build Steps

* run `gulp build`

### Tests

* run `gulp jasmine`

### API Documentation

* After running `bower install`, edit `/public/bower_components/swagger-ui/dist/index.html` and change the url towards the top of the file to `http://node.github.dev:8000/api-desc/`
* Then go to `http://node.github.dev:8000/api-docs/`