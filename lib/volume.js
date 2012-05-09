var connection = require("./connection");

var volume = exports;

volume.findAll = function (params, callback) {

	// Send the request
	connection.sendRequest("GET /upload HTTP/1.0\r\n\r\n", function(err, data) {

		// Do something with data such as convert it to the JSON string we want to send back
		var convertedData = data;

		callback(err, convertedData);
	});

	return this;
};