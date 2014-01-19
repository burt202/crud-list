## CRUD List App

Uses [NodeJS](http://nodejs.org/), [MongoDB](http://www.mongodb.org/), [Backbone](http://backbonejs.org/) (with [Marionette](http://marionettejs.com/)), [RequireJS](http://requirejs.org/) & [GulpJS](http://gulpjs.com/)

### Installation

* Make sure NodeJS and MongoDB are installed
* Run `npm install` in project directory
* Start app by running `gulp`

### Production Build Steps

Make sure you are in the project directory and run the following command in the terminal:

    node public/build/r.js -o public/build/build.json

When this is done, alter configs/app.json and change `type = 'production'`