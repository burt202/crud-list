var swig = require('swig');

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

	this.loadTests = function (req, res) {
		var tpl = swig.renderFile('public/tests/runner.html', {});

		res.set('Content-Type', 'text/html');
		res.send(tpl);
	};

	this.serveApiEndpoint = function (req, res) {
		var method = req.method.toLowerCase(),
			endpoint = req.url.substring(5, req.url.length), // strip off '/api/'
			handlerString = null,
			urlId = endpoint.split('/')[1],
			pattern, verb, route, routeObj, handlerSplit, controllerName, functionName, handler;

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