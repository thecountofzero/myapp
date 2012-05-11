var connection = require("./lib/connection"),
	volume = require("./lib/volume"),
	client = require("./lib/client");

var noop = function() {};

// Helpers

function doRequest(myapp, connection, requestObj) {
	var requestId = myapp.getRequestId(),
		request;

	if (typeof(requestObj.callback) !== 'function') requestObj.callback = noop;

	request = requestObj.command(requestId, requestObj.params, requestObj.callback);

	myapp.activeRequests[requestId] = request.responseHandler;

	connection.addRequest(request.command);
}

function MyApp() {

	var self = this;
	this.activeRequests = {};
	this.requestId = 1234567;

	connection.init(function(err, data) {

		if (err) {
			// figure out what to do with the error. cancel unfinished requests?
			console.log("error:" + err);
		}
		else {
			// look at the response. is it pending, error or complete?
			// if complete, get the request id and match it up with the appropriate callback

			data = data.replace(/<response><pending>.*<\/pending><\/response>/, "");

			var requestId = data.match(/<id>(\d+)<\/id>/),
				completeFlag = data.match(/<complete>/);

			if(completeFlag && requestId) {
				self.activeRequests[requestId[1]](err, data);
			}
		}
	});
}

MyApp.prototype.getRequestId = function() {
	return ++this.requestId;
};

MyApp.prototype.getVolumes = function(params, callback) {

	doRequest(this, connection, {
		command: volume.findAll,
		params: params,
		callback: callback
	});

	return this;
};

MyApp.prototype.getClients = function(params, callback) {

	doRequest(this, connection, {
		command: client.findAll,
		params: params,
		callback: arguments[arguments.length - 1]
	});

	return this;
};

module.exports = MyApp;

