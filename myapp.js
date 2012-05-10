var connection = require("./lib/connection"),
	player = require("./lib/player");

var noop = function() {};

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

MyApp.prototype.getPlayers = function(params, callback) {

	var requestId = this.getRequestId(),
		request;

	callback = arguments[arguments.length - 1];
	if (typeof(callback) !== 'function') callback = noop;

	request = player.findAll(requestId, params, callback);

	this.activeRequests[requestId] = request.responseHandler;

	connection.addRequest(request.command);

	return this;
};

MyApp.prototype.getPlayer = function(params, callback) {

	var requestId = this.getRequestId(),
		request = player.findOne(requestId, params, callback);

	callback = arguments[arguments.length - 1];
	if (typeof(callback) !== 'function') callback = noop;

	this.activeRequests[requestId] = request.responseHandler;

	connection.addRequest(request.command);

	return this;
};

module.exports = MyApp;

