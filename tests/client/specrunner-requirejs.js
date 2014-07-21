var requirejsConfig = require('../../public/js/config.js');

requirejsConfig.baseUrl = 'public/bower_components';
requirejsConfig.suppress = { nodeShim: true };
requirejsConfig.nodeRequire = require;

module.exports = require('requirejs').config(requirejsConfig);
