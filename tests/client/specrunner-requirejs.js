var requirejsConfig = {};

/* global define:true */
define = function (deps, callback) {
	requirejsConfig = callback();
};

require('../../public/js/config.js');
define = null;

requirejsConfig.baseUrl = 'public/bower_components';
requirejsConfig.suppress = { nodeShim: true };
requirejsConfig.nodeRequire = require;

module.exports = require('requirejs').config(requirejsConfig);
