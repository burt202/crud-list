var swig = require('swig'),
	fs = require('fs');

var IndexController = function (config) {
	this.config = config;

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

	// swagger routes

	this.apiDesc = function (req, res) {
		res.set('Content-Type', 'application/json');
		res.send(fs.readFileSync(__dirname + '/api-description.json', 'utf8'));
	};

	this.apiDocs = function (req, res) {
		res.redirect(this.config.swaggerPath);
	};
};

module.exports = IndexController;