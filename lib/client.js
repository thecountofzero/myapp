var xml2js = require('xml2js'),
	connection = require("./connection");

var client = exports,
	parser = new xml2js.Parser();

client.findAll = function (requestId, params, callback) {

	return {
		command: "<request><id>" + requestId + "</id><command>list_clients</command><user>test</user><password>test</password></request>",
		responseHandler: function(err, data) {

			parser.parseString(data, function(err, result) {
				callback(err, JSON.stringify(result));
			});
		}
	};
};