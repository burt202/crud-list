## CRUD List App

Uses [NodeJS](http://nodejs.org/), [MongoDB](http://www.mongodb.org/), [Backbone](http://backbonejs.org/) (with [Marionette](http://marionettejs.com/)) & [RequireJS](http://requirejs.org/)

### Installation

* Make sure NodeJS and MongoDB are installed
* Run `npm install` in project directory

### Production Build Steps

Make sure you are in the project directory and run the following commands in the terminal:

    lessc -x --include-path="public/css" public/css/imports.less > public/build/combined.css
    node public/build/r.js -o public/build/build.json

When this is done, alter configs/app.json and change `type = 'production'`