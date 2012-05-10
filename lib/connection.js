var net = require("net"),
	util = require("util");

var port = 3000,
	connection,
	connected = false,
	caCallback = null;
	queue = [];


function initializeConnection() {

	util.log("Initializing connection on port " + port);
	connection = net.createConnection(port);

	// Set encoding
	connection.setEncoding('utf8');

	connection.on("connect", function() {
		connected = true;
	}).on("end", function() {
		connected = false;
	}).on("error", function(connectionException) {

		// Check for connection refused error
		if (connectionException.errno === "ECONNREFUSED") {
			caCallback('ECONNREFUSED: Connection refused to CloudArray at port ' + port);
		}
		else {
			caCallback(connectionException.toString());
		}
	});
}

function processRequest(request, callback) {

	setTimeout(function() {

		if (!connected) {
			initializeConnection();
		}

		if(true) {

			connection.write(request);
			connection.on("data", function(data) {

				// Execute our callback to process the data returned from the service
				caCallback(null, data);
			});
		}
    }, 1000);
}

function queued(request, cb) {

    function tick() {
        if (queue.length > 0) {
            var next = queue[0];
            processRequest(next.request, function(err, result) {
                queue.shift();
                //next.callback(err, result);
                tick();
            });
        }
    }

    queue.push({ request: request, callback: cb });
    console.dir(queue);
    if (queue.length === 1) {
        tick();
    }
}

exports.init = function(callback) {
	console.log("init");
	caCallback = callback;
	initializeConnection();
};

exports.addRequest = function(request, callback) {

	queued(request, callback);
};




