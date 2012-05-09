var util = require("util"),
	player = require("./lib/player");

var myapp = exports,
	noop = function() {};

myapp.getPlayers = function(params, callback) {

	callback = arguments[arguments.length - 1];
	if (typeof(callback) !== 'function') callback = noop;

	player.findAll(params, function(err, data) {

		callback(err, data);
	});

	return this;
};

