var xml2js = require('xml2js'),
	connection = require("./connection");

var player = exports,
	parser = new xml2js.Parser();

player.findAll = function (requestId, params, callback) {

	return {
		command: "<request><id>" + requestId + "</id><command>list_clients</command><user>test</user><password>test</password></request>",
		responseHandler: function(err, data) {

			parser.parseString(data, function(err, result) {
				//console.log(JSON.stringify(result));
				//console.log(data);
				callback(err, JSON.stringify(result));
			});

			//callback(err, "Request ID: " + requestId + "\r\n\r\n" + data);
		}
	};
};

player.findOne = function (requestId, params, callback) {

	return {
		command: "<request><id>" + requestId + "</id><command>list_volumes</command><user>test</user><password>test</password></request>",
		responseHandler: function(err, data) {
			callback(err, "Request ID: " + requestId + "\r\n\r\n" + data);
		}
	};
};