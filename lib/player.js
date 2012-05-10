var xml2js = require('xml2js'),
	connection = require("./connection");

var player = exports,
	parser = new xml2js.Parser();

player.findAll = function (requestId, params, callback) {

	return {
		command: "GET /players/" + requestId + " HTTP/1.0\r\n\r\n",
		responseHandler: function(err, data) {
			callback(err, requestId + ": " + data);
		}
	};

	// Send the request
	/*connection.sendRequest("GET /upload HTTP/1.0\r\n\r\n", function(err, data) {

		// Process and convert data to JSON
		parser.parseString("<player><name>Ryan Braun</name><team>Brewers</team><homers>37</homers></player>", function(err, result) {
			callback(err, JSON.stringify(result));
		});

	});*/

	//return this;
};

player.findOne = function ( params, callback) {

	// Send the request
	connection.sendRequest("<request><command>get_player</command><player_id>" + params.playerId + "</player_id></request>", function(err, data) {

		// Process and convert data to JSON
		var convertedData = data;

		callback(err, convertedData);
	});

	return this;
};