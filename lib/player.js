var xml2js = require('xml2js'),
	connection = require("./connection");

var player = exports,
	parser = new xml2js.Parser();

player.findAll = function (requestId, params, callback) {

	return {
		command: "<request><id>" + requestId + "</id><command>list_volumes</command><user>test</user><password>test</password></request>",
		responseHandler: function(err, data) {

			parser.parseString(data, function(err, result) {
				console.log(JSON.stringify(result));
				console.log(data);
				callback(err, JSON.stringify(result));
			});
			//callback(err, "Request ID: " + requestId + "\r\n\r\n" + data);
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

player.findOne = function (requestId, params, callback) {

	return {
		command: "<request><id>" + requestId + "</id><command>list_volumes</command><user>test</user><password>test</password></request>",
		responseHandler: function(err, data) {
			callback(err, "Request ID: " + requestId + "\r\n\r\n" + data);
		}
	};
};