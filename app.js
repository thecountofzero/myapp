var MyApp = require("./myapp");

var myapp = new MyApp();

// Example of what a function would look like that a route called
var getPlayers = function(params, callback) {

	// Call the getPlayers function of the API
	myapp.getPlayers(params, function(err, data) {

		// Execute callback that responds with return value
		callback(err, data);
	});
};

var getPlayer = function(params, callback) {

	// Error found, do something with it
	// Call the getPlayers function of the API
	myapp.getPlayer(params, function(err, data) {

		// Execute callback that responds with return value
		callback(err, data);
	});
};

getPlayer({id: "789"}, function(err, data) {

	console.log("\r\nList Volumes ****************************");
	// Error found, do something with it
	if (err) {
		console.log(err);
	}
	else {
		// Send the data back to the browser
		console.log(data);
	}
});

// Test getPlayers
getPlayers({}, function(err, data) {

	console.log("\r\nList Clients ****************************");
	// Error found, do something with it
	if (err) {
		console.log(err);
	}
	else {
		// Send the data back to the browser
		console.log(data);
	}
});

