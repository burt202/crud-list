var swig = require('swig');

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
};

module.exports = IndexController;