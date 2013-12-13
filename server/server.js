var swig = require('swig'),
	fs = require('fs'),
	less = require('less');

var ServerController = function (rootPath, config, routes, db) {
	this.rootPath = rootPath;
	this.config = config;
	this.routes = routes;
	this.db = db;

	this.load = function (req, res) {
		var tpl,
			urlOverride = false;

		if (req.query.rawAssets !== undefined) {
			urlOverride = true;
		}

		tpl = swig.renderFile('public/templates/layout.html', {
			envType: this.config.type,
			urlOverride: urlOverride
		});

		res.set('Content-Type', 'text/html');
		res.send(tpl);
	};

	this.compileLess = function (req, res) {
		var filePath = this.rootPath + '/public/css/imports.less',
			lessCode = fs.readFileSync(filePath, 'utf8'),
			parser = new less.Parser({ paths: ['public/css/'] });

		parser.parse(lessCode, function (error, cssTree) {
			res.set('Content-Type', 'text/css');
			res.send(cssTree.toCSS());
		});
	};

	this.serveApiEndpoint = function (req, res) {
		var method = req.method.toLowerCase(),
			endpoint = req.url.substring(5, req.url.length), // strip off '/api/'
			handlerString = null,
			urlId = endpoint.split('/')[1],
			pattern, routeObj, handlerSplit, controllerName, functionName, handler;

		for (route in this.routes) {
			if (this.routes.hasOwnProperty(route)) {
				pattern = new RegExp(route);
				routeObj = this.routes[route];
				if (pattern.test(endpoint)) {
					for (verb in routeObj) {
						if (routeObj.hasOwnProperty(verb)) {
							if (verb === method && !handlerString) {
								handlerString = routeObj[verb];
							}
						}
					}
				}
			}
		}

		if (handlerString) {
			handlerSplit = handlerString.split(':');
			controllerName = handlerSplit[0];
			functionName = handlerSplit[1];
			handler = require(__dirname + '/api/' + controllerName);
			handler[functionName](req, res, this.db, urlId);
		} else {
			res.set('Content-Type', 'application/json');
			res.send(400, {
				state: 'error',
				message: 'No endpoint found',
				data: {}
			});
		}
	};
};

module.exports = ServerController;