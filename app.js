var express = require('express'),
	fs = require('fs'),
	MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server,
	config = JSON.parse(fs.readFileSync(__dirname + '/configs/app.json', 'utf8')),
	IndexController = require(__dirname + '/server/index'),
	app = express(),
	mongoclient = new MongoClient(new Server(config.databaseHost, config.databasePort), {native_parser: true}),
	bodyParser = require('body-parser');

mongoclient.open(function(err, mongoclient) {
	var db = mongoclient.db(config.databaseName),
		controller = new IndexController(config),
		apiRoutes = require(__dirname + '/server/api-routes')(config, db);

	app.use(bodyParser()),
	app.use(express.static(__dirname + '/public'));

	app.use('/api', apiRoutes);
	app.get('/api-desc', controller.apiDesc.bind(controller));
	app.get('/api-docs', controller.apiDocs.bind(controller));
	app.get('*', controller.load.bind(controller));

	app.listen(config.port, config.domain);
	console.log('App running at http://' + config.domain + ':' + config.port);
	console.log('API docs running at http://' + config.domain + ':' + config.port + '/api-docs');
});