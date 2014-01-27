var express = require('express'),
	fs = require('fs'),
	MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server,
	config = JSON.parse(fs.readFileSync(__dirname + '/configs/app.json', 'utf8')),
	routes = JSON.parse(fs.readFileSync(__dirname + '/configs/routes.json', 'utf8')),
	AppController = require(__dirname + '/server/server'),
	app = express(),
	mongoclient = new MongoClient(new Server(config.databaseHost, config.databasePort), {native_parser: true});

mongoclient.open(function(err, mongoclient) {
	var db = mongoclient.db(config.databaseName),
		controller = new AppController(__dirname, config, routes, db);

	app.use(express.bodyParser()),
	app.use(express.static(__dirname + '/public'));

	app.all('/api/*', controller.serveApiEndpoint.bind(controller));
	app.get('/tests', controller.loadTests.bind(controller));
	app.get('*', controller.load.bind(controller));

	app.listen(config.port, config.domain);
});