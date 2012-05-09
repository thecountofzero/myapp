var net = require("net"),
	util = require("util");

var port = 3000;


exports.sendRequest = function(request, callback) {

	// Establish a connection
	var connection = net.createConnection(port);

	// Set encoding
	connection.setEncoding('utf8');

	// Attach event handlers
	connection.on("error", function(connectionException) {

		// Check for connection refused error
		if (connectionException.errno === "ECONNREFUSED") {
			callback('ECONNREFUSED: Connection refused to CloudArray at port ' + port);
		}
		else {
			callback(connectionException.toString());
		}
	}).on("connect", function() {

		// Send the request to the service
		connection.write(request);
	}).on("data", function(data) {

		// Execute our callback to process the data returned from the service
		callback(null, data);

		// Force the connection to time out
		connection.setTimeout(2000, function() {});
	}).on('end', function() {
		// Not sure what I want to do here yet
	}).on("timeout", function() {
		connection.destroy();
	});
};