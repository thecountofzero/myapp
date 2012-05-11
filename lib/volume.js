var xml2js = require('xml2js'),
	connection = require("./connection");

var volume = exports,
	parser = new xml2js.Parser();

volume.findAll = function (requestId, params, callback) {

	return {
		command: "<request><id>" + requestId + "</id><command>list_volumes</command><user>test</user><password>test</password></request>",
		responseHandler: function(err, data) {

			parser.parseString(data, function(err, result) {
				callback(err, JSON.stringify(result));
			});

			//callback(err, "Request ID: " + requestId + "\r\n\r\n" + data);
		}
	};
};

volume.findOne = function (requestId, params, callback) {

	return {
		command: "<request><id>" + requestId + "</id><command>list_volumes</command><user>test</user><password>test</password></request>",
		responseHandler: function(err, data) {
			callback(err, "Request ID: " + requestId + "\r\n\r\n" + data);
		}
	};
};